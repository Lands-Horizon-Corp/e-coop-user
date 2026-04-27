import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const DEFAULT_EXTENSIONS = new Set([
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    '.mts',
    '.cts',
])

const DEFAULT_SKIP_DIRS = new Set([
    '.git',
    '.nx',
    'dist',
    'build',
    'coverage',
    'node_modules',
])

export async function getModuleNames(modulesDir) {
    const entries = await readdir(modulesDir, { withFileTypes: true })
    return entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
}

export async function collectSourceFiles(
    rootDir,
    extensions = DEFAULT_EXTENSIONS
) {
    const files = []
    const stack = [rootDir]

    while (stack.length > 0) {
        const current = stack.pop()
        const entries = await readdir(current, { withFileTypes: true })

        for (const entry of entries) {
            const fullPath = path.join(current, entry.name)
            if (entry.isDirectory()) {
                if (!DEFAULT_SKIP_DIRS.has(entry.name)) {
                    stack.push(fullPath)
                }
                continue
            }

            if (extensions.has(path.extname(entry.name))) {
                files.push(fullPath)
            }
        }
    }

    return files
}

export function findBadModuleImports({
    content,
    moduleNames,
    filePath,
    modulesDir,
}) {
    const matches = []
    const importRegex = /\bimport\s+[^"']*?["']([^"']+)["']/g
    const exportRegex = /\bexport\s+[^"']*?\sfrom\s+["']([^"']+)["']/g
    const requireRegex = /\brequire\(\s*["']([^"']+)["']\s*\)/g

    const scan = (regex) => {
        let result
        while ((result = regex.exec(content))) {
            matches.push({ specifier: result[1], index: result.index })
        }
    }

    scan(importRegex)
    scan(exportRegex)
    scan(requireRegex)

    const issues = []
    const currentModuleName = getCurrentModuleName(filePath, modulesDir)
    const moduleRoot =
        currentModuleName && modulesDir
            ? path.join(modulesDir, currentModuleName)
            : null
    for (const match of matches) {
        const normalized = match.specifier.replace(/\\/g, '/')
        const uiAlias = getUiAliasForComponents(normalized)
        if (uiAlias) {
            issues.push({
                specifier: match.specifier,
                index: match.index,
                expectedAlias: uiAlias,
            })
            continue
        }

        if (normalized.startsWith('@e-coop-monorepo/')) {
            continue
        }

        const moduleName = matchModuleName({
            specifier: normalized,
            moduleNames,
            filePath,
            modulesDir,
        })
        if (moduleName) {
            issues.push({
                specifier: match.specifier,
                index: match.index,
                moduleName,
                expectedAlias: `@e-coop-monorepo/modules/${moduleName}`,
            })
            continue
        }

        if (!currentModuleName || !isRelativeOrEllipsis(normalized)) {
            continue
        }

        if (
            moduleRoot &&
            !isRelativeOutsideModule({
                specifier: normalized,
                filePath,
                moduleRoot,
            })
        ) {
            continue
        }

        const externalAlias = deriveExternalAlias(normalized)
        if (!externalAlias) {
            continue
        }

        issues.push({
            specifier: match.specifier,
            index: match.index,
            expectedAlias: externalAlias,
        })
    }

    return issues
}

export async function checkModuleFolder({
    moduleDir,
    moduleNames,
    modulesDir,
}) {
    const files = await collectSourceFiles(moduleDir)
    const results = []
    const moduleRoot = modulesDir ?? path.dirname(moduleDir)

    for (const filePath of files) {
        const content = await readFile(filePath, 'utf8')
        const issues = findBadModuleImports({
            content,
            moduleNames,
            filePath,
            modulesDir: moduleRoot,
        })
        if (issues.length === 0) {
            continue
        }

        results.push({ filePath, content, issues })
    }

    return results
}

export async function fixModuleFolder({ moduleDir, moduleNames, modulesDir }) {
    const files = await collectSourceFiles(moduleDir)
    const results = []
    const moduleRoot = modulesDir ?? path.dirname(moduleDir)

    for (const filePath of files) {
        const content = await readFile(filePath, 'utf8')
        const issues = findBadModuleImports({
            content,
            moduleNames,
            filePath,
            modulesDir: moduleRoot,
        })

        if (issues.length === 0) {
            continue
        }

        const { updatedContent, updated } = applyModuleImportFixes({
            content,
            issues,
        })

        if (updated) {
            await writeFile(filePath, updatedContent, 'utf8')
        }

        results.push({ filePath, content, issues, updated })
    }

    return results
}

export function toLineNumber(content, index) {
    return content.slice(0, index).split('\n').length
}

export function formatIssue({ filePath, content, issue, rootDir }) {
    const line = toLineNumber(content, issue.index)
    const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/')
    const expected = issue.expectedAlias
        ? issue.expectedAlias
        : `@e-coop-monorepo/modules/${issue.moduleName}`

    return `${relativePath}:${line} - ${issue.specifier} -> ${expected}`
}

export function applyModuleImportFixes({ content, issues }) {
    let updatedContent = content
    let updated = false

    for (const issue of issues) {
        const expected = issue.expectedAlias
            ? issue.expectedAlias
            : `@e-coop-monorepo/modules/${issue.moduleName}`
        const escaped = escapeRegex(issue.specifier)
        const replaceRegex = new RegExp(`(["'])${escaped}\\1`, 'g')
        const nextContent = updatedContent.replace(
            replaceRegex,
            `$1${expected}$1`
        )
        if (nextContent !== updatedContent) {
            updatedContent = nextContent
            updated = true
        }
    }

    return { updatedContent, updated }
}

function getCurrentModuleName(filePath, modulesDir) {
    if (!modulesDir || !filePath) {
        return null
    }

    const relativePath = path.relative(modulesDir, filePath).replace(/\\/g, '/')
    if (relativePath.startsWith('..')) {
        return null
    }

    const [moduleName] = relativePath.split('/')
    return moduleName || null
}

function isRelativeToSiblingModule(specifier, moduleNames, currentModuleName) {
    if (!specifier.startsWith('..') && !specifier.startsWith('...')) {
        return null
    }

    const parts = specifier.split('/')
    let index = 0
    while (
        index < parts.length &&
        (parts[index] === '..' || parts[index] === '...')
    ) {
        index += 1
    }

    const candidate = parts[index]
    if (!candidate || !moduleNames.includes(candidate)) {
        return null
    }

    if (currentModuleName && candidate === currentModuleName) {
        return null
    }

    return candidate
}

function isRelativeOrEllipsis(specifier) {
    return specifier.startsWith('.') || specifier.startsWith('...')
}

function isRelativeOutsideModule({ specifier, filePath, moduleRoot }) {
    if (!specifier.startsWith('.')) {
        return false
    }

    const resolved = path.resolve(path.dirname(filePath), specifier)
    const normalizedRoot = path.resolve(moduleRoot) + path.sep
    return !resolved.startsWith(normalizedRoot)
}

function deriveExternalAlias(specifier) {
    const segments = specifier
        .split('/')
        .filter(
            (segment) =>
                segment &&
                segment !== '.' &&
                segment !== '..' &&
                segment !== '...'
        )

    if (segments.length === 0) {
        return null
    }

    if (segments.includes('components')) {
        return '@e-coop-monorepo/ui'
    }

    const [sharedRoot, ...rest] = segments
    return rest.length > 0
        ? `@e-coop-monorepo/shared/${sharedRoot}/${rest.join('/')}`
        : `@e-coop-monorepo/shared/${sharedRoot}`
}

function matchModuleName({ specifier, moduleNames, filePath, modulesDir }) {
    for (const name of moduleNames) {
        if (
            specifier.includes(`/modules/${name}`) ||
            specifier.includes(`libs/modules/${name}`)
        ) {
            return name
        }
    }

    const currentModuleName = getCurrentModuleName(filePath, modulesDir)
    if (!currentModuleName) {
        return null
    }

    return isRelativeToSiblingModule(specifier, moduleNames, currentModuleName)
}

function getUiAliasForComponents(specifier) {
    if (specifier === '@e-coop-monorepo/ui') {
        return null
    }

    if (specifier.startsWith('@e-coop-monorepo/ui/')) {
        return '@e-coop-monorepo/ui'
    }

    const segments = specifier
        .split('/')
        .filter(
            (segment) =>
                segment &&
                segment !== '.' &&
                segment !== '..' &&
                segment !== '...'
        )

    if (segments.includes('components')) {
        return '@e-coop-monorepo/ui'
    }

    return null
}

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')
}
