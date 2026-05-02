import { readFileSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { collectSourceFiles } from './import-path-checker.mjs'

const rootDir = process.cwd()
const checkOnly = process.argv.includes('--check')
const modulesRoots = [
    path.join(rootDir, 'apps', 'e-coop-member', 'src', 'modules'),
    path.join(rootDir, 'libs', 'modules'),
]

const sourceFiles = []
for (const modulesRoot of modulesRoots) {
    const files = await collectSourceFiles(modulesRoot)
    sourceFiles.push(...files)
}

const importPattern =
    /(^[ \t]*(?:import|export)\s+(?:type\s+)?(?:\{[\s\S]*?\}|[^'";]+?)\s+from\s+)(['"])([^'"]+)\2([ \t]*;?[ \t]*)/gm

const changedFiles = []

for (const filePath of sourceFiles) {
    const original = readFileSync(filePath, 'utf8')
    const updated = rewriteModuleAliases(filePath, original)

    if (updated === original) {
        continue
    }

    changedFiles.push(filePath)
    if (!checkOnly) {
        writeFileSync(filePath, updated, 'utf8')
    }
}

if (changedFiles.length === 0) {
    console.log('No sibling module imports found.')
    process.exit(0)
}

const verb = checkOnly ? 'Found' : 'Fixed'
console.log(
    `${verb} ${changedFiles.length} file(s) with sibling module imports.`
)

if (checkOnly) {
    for (const filePath of changedFiles) {
        console.log(path.relative(rootDir, filePath).replace(/\\/g, '/'))
    }
    process.exit(1)
}

function rewriteModuleAliases(filePath, content) {
    const currentModuleRoot = getModuleRoot(filePath)
    if (!currentModuleRoot) {
        return content
    }

    const aliasPrefix = '@ecoop/modules/'

    return content.replace(
        importPattern,
        (fullMatch, statementStart, quote, specifier, statementEnd) => {
            if (specifier.startsWith('.')) {
                const alias = rewriteSpecifierToAlias({
                    filePath,
                    specifier,
                    currentModuleRoot,
                })

                if (!alias) {
                    return fullMatch
                }

                return `${statementStart}${quote}${alias}${quote}${statementEnd}`
            }

            if (!specifier.startsWith(aliasPrefix)) {
                return fullMatch
            }

            const collapsed = collapseModuleEntryAlias(specifier, aliasPrefix)
            if (!collapsed) {
                return fullMatch
            }

            return `${statementStart}${quote}${collapsed}${quote}${statementEnd}`
        }
    )
}

function collapseModuleEntryAlias(specifier, aliasPrefix) {
    const remainder = specifier.slice(aliasPrefix.length)
    const segments = remainder.split('/').filter(Boolean)
    const [moduleName, nextSegment, ...rest] = segments

    if (!moduleName || !nextSegment) {
        return null
    }

    const entryPointPrefixes = [`${moduleName}.`, 'index']

    const isEntryPoint = entryPointPrefixes.some(
        (prefix) => nextSegment === prefix || nextSegment.startsWith(prefix)
    )

    if (!isEntryPoint || rest.length > 0) {
        return null
    }

    return `${aliasPrefix}${moduleName}`
}

function rewriteSpecifierToAlias({ filePath, specifier, currentModuleRoot }) {
    const resolvedPath = path.resolve(path.dirname(filePath), specifier)
    const targetModuleRoot = getTargetModuleRoot(resolvedPath)

    if (!targetModuleRoot || targetModuleRoot === currentModuleRoot) {
        return null
    }

    const targetModuleName = path.basename(targetModuleRoot)

    return `@ecoop/modules/${targetModuleName}`
}

function getModuleRoot(filePath) {
    for (const modulesRoot of modulesRoots) {
        const relative = path
            .relative(modulesRoot, filePath)
            .replace(/\\/g, '/')
        if (relative.startsWith('..')) {
            continue
        }

        const [moduleName] = relative.split('/')
        if (!moduleName) {
            continue
        }

        return path.join(modulesRoot, moduleName)
    }

    return null
}

function getTargetModuleRoot(resolvedPath) {
    for (const modulesRoot of modulesRoots) {
        const relative = path
            .relative(modulesRoot, resolvedPath)
            .replace(/\\/g, '/')
        if (relative.startsWith('..')) {
            continue
        }

        const [moduleName] = relative.split('/')
        if (!moduleName) {
            continue
        }

        const targetRoot = path.join(modulesRoot, moduleName)
        if (isDirectory(targetRoot)) {
            return targetRoot
        }
    }

    return null
}

function isDirectory(filePath) {
    try {
        return statSync(filePath).isDirectory()
    } catch {
        return false
    }
}
