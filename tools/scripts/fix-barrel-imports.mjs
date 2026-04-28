import { readFileSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { collectSourceFiles } from './import-path-checker.mjs'

const rootDir = process.cwd()
const checkOnly = process.argv.includes('--check')

const scanRoots = ['apps', 'libs']
const sourceFiles = new Set()

for (const scanRoot of scanRoots) {
    const absRoot = path.join(rootDir, scanRoot)
    const files = await collectSourceFiles(absRoot)
    for (const filePath of files) {
        sourceFiles.add(filePath)
    }
}

const exportCache = new Map()
const barrelCache = new Map()
const importPattern =
    /^[ \t]*import\s+(type\s+)?\{([\s\S]*?)\}\s+from\s+(['"])([^'"]+)\3\s*;?[ \t]*/gm

const findings = []

for (const filePath of sourceFiles) {
    const originalContent = readFileSync(filePath, 'utf8')
    const updatedContent = rewriteBarrelImports({
        filePath,
        content: originalContent,
    })

    if (updatedContent === originalContent) {
        continue
    }

    findings.push(filePath)

    if (!checkOnly) {
        writeFileSync(filePath, updatedContent, 'utf8')
    }
}

if (findings.length === 0) {
    console.log('No resolvable barrel imports found.')
    process.exit(0)
}

const verb = checkOnly ? 'Found' : 'Fixed'
console.log(`${verb} ${findings.length} file(s) with barrel imports.`)

if (checkOnly) {
    for (const filePath of findings) {
        console.log(path.relative(rootDir, filePath).replace(/\\/g, '/'))
    }
    process.exit(1)
}

function rewriteBarrelImports({ filePath, content }) {
    return content.replace(
        importPattern,
        (fullMatch, typeKeyword, specifiers, _quote, specifier) => {
            const barrelDir = resolveBarrelDirectory(filePath, specifier)
            if (!barrelDir) {
                return fullMatch
            }

            const imports = splitNamedImports(specifiers)
            if (imports.length === 0) {
                return fullMatch
            }

            const grouped = new Map()

            for (const entry of imports) {
                const exportedSource = resolveExportSource({
                    barrelDir,
                    symbolName: entry.exportedName,
                })

                if (!exportedSource) {
                    return fullMatch
                }

                const relativeTarget = toImportPath(filePath, exportedSource)
                const current = grouped.get(relativeTarget) ?? []
                current.push(entry)
                grouped.set(relativeTarget, current)
            }

            const nextImports = []
            const isTypeOnly = Boolean(typeKeyword)

            for (const [targetPath, entries] of grouped) {
                const clause = entries
                    .map((entry) =>
                        entry.localName === entry.exportedName
                            ? entry.exportedName
                            : `${entry.exportedName} as ${entry.localName}`
                    )
                    .join(', ')

                nextImports.push(
                    `${isTypeOnly ? 'import type' : 'import'} { ${clause} } from '${targetPath}'`
                )
            }

            return nextImports.join('\n')
        }
    )
}

function splitNamedImports(specifiers) {
    return specifiers
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => {
            const normalized = part.replace(/^type\s+/, '')
            const [importedName, localName] = normalized
                .split(/\s+as\s+/i)
                .map((item) => item.trim())

            return {
                exportedName: importedName,
                localName: localName || importedName,
            }
        })
}

function resolveBarrelDirectory(filePath, specifier) {
    const resolvedPath = path.resolve(path.dirname(filePath), specifier)

    const cached = barrelCache.get(resolvedPath)
    if (cached !== undefined) {
        return cached
    }

    const candidateDirs = []
    if (isDirectory(resolvedPath)) {
        candidateDirs.push(resolvedPath)
    }

    const resolvedBase = path.basename(resolvedPath)
    if (resolvedBase === 'index') {
        candidateDirs.push(path.dirname(resolvedPath))
    }

    for (const candidateDir of candidateDirs) {
        if (hasBarrelFile(candidateDir)) {
            barrelCache.set(resolvedPath, candidateDir)
            return candidateDir
        }
    }

    barrelCache.set(resolvedPath, null)
    return null
}

function hasBarrelFile(directoryPath) {
    return (
        isFile(path.join(directoryPath, 'index.ts')) ||
        isFile(path.join(directoryPath, 'index.tsx')) ||
        isFile(path.join(directoryPath, 'index.mts')) ||
        isFile(path.join(directoryPath, 'index.cts'))
    )
}

function resolveExportSource({ barrelDir, symbolName }) {
    const barrelFile = getBarrelFile(barrelDir)
    if (!barrelFile) {
        return null
    }

    const exportMap = getExportMap(barrelFile)
    return exportMap.get(symbolName)?.sourceFile ?? null
}

function getBarrelFile(barrelDir) {
    for (const filename of [
        'index.ts',
        'index.tsx',
        'index.mts',
        'index.cts',
    ]) {
        const candidate = path.join(barrelDir, filename)
        if (isFile(candidate)) {
            return candidate
        }
    }

    return null
}

function getExportMap(filePath, trail = new Set()) {
    const cached = exportCache.get(filePath)
    if (cached) {
        return cached
    }

    if (trail.has(filePath)) {
        return new Map()
    }

    const nextTrail = new Set(trail)
    nextTrail.add(filePath)

    const content = readFileSync(filePath, 'utf8')
    const exports = new Map()

    const directExportPattern =
        /^\s*export\s+(type\s+)?(interface|type|class|function|const|let|var|enum)\s+([A-Za-z0-9_]+)/gm
    let match
    while ((match = directExportPattern.exec(content))) {
        const [, typeKeyword, exportKind, name] = match
        const typeOnly =
            Boolean(typeKeyword) ||
            exportKind === 'interface' ||
            exportKind === 'type'
        exports.set(name, {
            sourceFile: filePath,
            typeOnly,
        })
    }

    const namedExportPattern =
        /^\s*export\s+\{([\s\S]*?)\}\s*(?:from\s+['"]([^'"]+)['"])?/gm
    while ((match = namedExportPattern.exec(content))) {
        const [, clause, fromPath] = match
        const entries = clause
            .split(',')
            .map((part) => part.trim())
            .filter(Boolean)

        if (fromPath) {
            const targetFile = resolveImportTarget(filePath, fromPath)
            if (!targetFile) {
                continue
            }

            const targetExports = getExportMap(targetFile, nextTrail)
            for (const entry of entries) {
                const [localName, exportedName] = entry
                    .split(/\s+as\s+/i)
                    .map((value) => value.trim())
                const resolvedName = exportedName || localName
                const source = targetExports.get(localName)
                if (!source) {
                    continue
                }

                exports.set(resolvedName, source)
            }

            continue
        }

        for (const entry of entries) {
            const [localName, exportedName] = entry
                .split(/\s+as\s+/i)
                .map((value) => value.trim())
            const resolvedName = exportedName || localName

            exports.set(resolvedName, {
                sourceFile: filePath,
                typeOnly: false,
            })
        }
    }

    const starExportPattern = /^\s*export\s+\*\s+from\s+['"]([^'"]+)['"]/gm
    while ((match = starExportPattern.exec(content))) {
        const targetFile = resolveImportTarget(filePath, match[1])
        if (!targetFile) {
            continue
        }

        const targetExports = getExportMap(targetFile, nextTrail)
        for (const [name, source] of targetExports) {
            exports.set(name, source)
        }
    }

    exportCache.set(filePath, exports)
    return exports
}

function resolveImportTarget(fromFile, specifier) {
    const resolvedPath = path.resolve(path.dirname(fromFile), specifier)
    const candidates = getPathCandidates(resolvedPath)

    for (const candidate of candidates) {
        if (isFile(candidate)) {
            return candidate
        }

        if (isDirectory(candidate)) {
            const barrelFile = getBarrelFile(candidate)
            if (barrelFile) {
                return barrelFile
            }
        }
    }

    return null
}

function getPathCandidates(resolvedPath) {
    const candidates = [resolvedPath]

    if (!path.extname(resolvedPath)) {
        candidates.push(`${resolvedPath}.ts`)
        candidates.push(`${resolvedPath}.tsx`)
        candidates.push(`${resolvedPath}.mts`)
        candidates.push(`${resolvedPath}.cts`)
        candidates.push(path.join(resolvedPath, 'index.ts'))
        candidates.push(path.join(resolvedPath, 'index.tsx'))
        candidates.push(path.join(resolvedPath, 'index.mts'))
        candidates.push(path.join(resolvedPath, 'index.cts'))
    }

    return candidates
}

function toImportPath(fromFile, targetFile) {
    const relative = path.relative(path.dirname(fromFile), targetFile)
    const normalized = relative
        .replace(/\\/g, '/')
        .replace(/\.(ts|tsx|mts|cts)$/, '')

    return normalized.startsWith('.') ? normalized : `./${normalized}`
}

function isFile(filePath) {
    try {
        return statSync(filePath).isFile()
    } catch {
        return false
    }
}

function isDirectory(filePath) {
    try {
        return statSync(filePath).isDirectory()
    } catch {
        return false
    }
}
