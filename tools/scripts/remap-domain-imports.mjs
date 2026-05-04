import { existsSync, lstatSync, readFileSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'

import { collectSourceFiles } from './import-path-checker.mjs'

const require = createRequire(import.meta.url)
const { mapping } = require('../move-modules-to-domains.cjs')

const rootDir = process.cwd()
const domainsRoot = path.join(rootDir, 'libs', 'domains')
const checkOnly = process.argv.includes('--check')
const sourceFiles = await collectSourceFiles(rootDir)
const exportCache = new Map()

const moduleToDomain = new Map()
for (const [domainName, moduleNames] of Object.entries(mapping)) {
    for (const moduleName of moduleNames) {
        moduleToDomain.set(moduleName, domainName)
    }
}

const importExportPattern =
    /(^[ \t]*(import|export)\s+(type\s+)?(?:\{([\s\S]*?)\}|([^'";]+?))\s+from\s+)(['"])([^'"]+)\6([ \t]*;?[ \t]*)/gm

const changedFiles = []

for (const filePath of sourceFiles) {
    const original = await readFile(filePath, 'utf8')
    const updated = original.replace(
        importExportPattern,
        (fullMatch, statementStart, statementKind, typeKeyword, namedClause, defaultClause, quote, specifier) => {
            const rewritten = rewriteStatement({
                filePath,
                statementKind,
                typeKeyword,
                namedClause,
                defaultClause,
                specifier,
            })

            return rewritten ?? fullMatch
        }
    )

    if (updated === original) {
        continue
    }

    changedFiles.push(filePath)
    if (!checkOnly) {
        await writeFile(filePath, updated, 'utf8')
    }
}

if (changedFiles.length === 0) {
    console.log('No domain imports needed remap.')
    process.exit(0)
}

if (checkOnly) {
    console.log(`Found ${changedFiles.length} file(s) with domain imports.`)
    for (const filePath of changedFiles) {
        console.log(path.relative(rootDir, filePath).replace(/\\/g, '/'))
    }
    process.exit(1)
}

console.log(`Updated ${changedFiles.length} file(s) with domain imports.`)

function rewriteStatement({
    filePath,
    statementKind,
    typeKeyword,
    namedClause,
    defaultClause,
    specifier,
}) {
    const currentDomain = getCurrentDomain(filePath)

    if (specifier.startsWith('@ecoop/modules/')) {
        const remainder = specifier.slice('@ecoop/modules/'.length)
        const [moduleName, ...rest] = remainder.split('/')
        const domainName = moduleToDomain.get(moduleName)

        if (!domainName) {
            return null
        }

        const targetFile = resolveModuleTargetFile({
            domainName,
            moduleName,
            rest,
        })

        if (currentDomain && currentDomain === domainName) {
            return rewriteSameDomainStatement({
                filePath,
                statementKind,
                typeKeyword,
                namedClause,
                defaultClause,
                barrelFile: targetFile,
            })
        }

        return rebuildStatement({
            statementKind,
            typeKeyword,
            namedClause,
            defaultClause,
            targetSpecifier: `@ecoop/domains/${domainName}`,
        })
    }

    if (specifier.startsWith('@ecoop/domains/')) {
        const domainName = specifier.slice('@ecoop/domains/'.length).split('/')[0]

        if (!currentDomain || currentDomain !== domainName) {
            return null
        }

        const targetFile = resolveDomainTargetFile({
            domainName,
            specifier,
        })

        return rewriteSameDomainStatement({
            filePath,
            statementKind,
            typeKeyword,
            namedClause,
            defaultClause,
            barrelFile: targetFile,
        })
    }

    return null
}

function rewriteSameDomainStatement({
    filePath,
    statementKind,
    typeKeyword,
    namedClause,
    defaultClause,
    barrelFile,
}) {
    if (!barrelFile) {
        return null
    }

    const namedItems = namedClause ? parseClauseItems(namedClause) : []
    const defaultItem = defaultClause ? parseDefaultClause(defaultClause) : null

    if (namedItems.length === 0 && !defaultItem) {
        return null
    }

    const resolvedGroups = new Map()

    for (const item of namedItems) {
        const sourceFile = resolveExportSource(barrelFile, item.exportedName)
        if (!sourceFile) {
            return null
        }

        const targetPath = toImportPath(filePath, sourceFile)
        const key = `${item.typeOnly ? 'type:' : 'value:'}${targetPath}`
        const group = resolvedGroups.get(key) ?? {
            targetPath,
            typeOnly: item.typeOnly,
            named: [],
            defaultImport: null,
        }

        group.named.push(item)
        resolvedGroups.set(key, group)
    }

    if (defaultItem) {
        const sourceFile = resolveExportSource(barrelFile, 'default')
        if (!sourceFile) {
            return null
        }

        const targetPath = toImportPath(filePath, sourceFile)
        const key = `default:${targetPath}`
        const group = resolvedGroups.get(key) ?? {
            targetPath,
            typeOnly: false,
            named: [],
            defaultImport: null,
        }

        group.defaultImport = defaultItem
        resolvedGroups.set(key, group)
    }

    const statements = []
    for (const group of resolvedGroups.values()) {
        if (group.named.length > 0) {
            statements.push(
                renderNamedStatement({
                    statementKind,
                    typeKeyword,
                    namedItems: group.named,
                    targetSpecifier: group.targetPath,
                    forceType: group.typeOnly,
                })
            )
        }

        if (group.defaultImport) {
            statements.push(
                renderDefaultStatement({
                    statementKind,
                    typeKeyword,
                    defaultItem: group.defaultImport,
                    targetSpecifier: group.targetPath,
                })
            )
        }
    }

    return statements.join('\n')
}

function rebuildStatement({
    statementKind,
    typeKeyword,
    namedClause,
    defaultClause,
    targetSpecifier,
}) {
    const prefix = `${statementKind} ${typeKeyword ?? ''}`.replace(/\s+/g, ' ').trimEnd()

    if (namedClause && defaultClause) {
        return `${prefix} ${defaultClause.trim()}, { ${normalizeNamedClause(namedClause)} } from '${targetSpecifier}'`
    }

    if (namedClause) {
        return `${prefix} { ${normalizeNamedClause(namedClause)} } from '${targetSpecifier}'`
    }

    if (defaultClause) {
        return `${prefix} ${defaultClause.trim()} from '${targetSpecifier}'`
    }

    return null
}

function renderNamedStatement({
    statementKind,
    typeKeyword,
    namedItems,
    targetSpecifier,
    forceType = false,
}) {
    const clause = namedItems
        .map((item) =>
            item.localName === item.exportedName
                ? item.exportedName
                : `${item.exportedName} as ${item.localName}`
        )
        .join(', ')

    const statementPrefix = forceType
        ? `${statementKind} type`
        : `${statementKind}${typeKeyword ? ` ${typeKeyword.trim()}` : ''}`

    return `${statementPrefix} { ${clause} } from '${targetSpecifier}'`
}

function renderDefaultStatement({
    statementKind,
    typeKeyword,
    defaultItem,
    targetSpecifier,
}) {
    const statementPrefix = `${statementKind}${typeKeyword ? ` ${typeKeyword.trim()}` : ''}`
    return `${statementPrefix} ${defaultItem.localName} from '${targetSpecifier}'`
}

function normalizeNamedClause(namedClause) {
    return namedClause
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)
        .join(', ')
}

function parseClauseItems(namedClause) {
    return namedClause
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => {
            const typeOnly = part.startsWith('type ')
            const normalized = typeOnly ? part.slice(5).trim() : part
            const [importedName, localName] = normalized
                .split(/\s+as\s+/i)
                .map((value) => value.trim())

            return {
                exportedName: importedName,
                localName: localName || importedName,
                typeOnly,
            }
        })
}

function parseDefaultClause(defaultClause) {
    const normalized = defaultClause.trim().replace(/,$/, '').trim()
    if (!normalized || normalized.startsWith('* as ')) {
        return null
    }

    return {
        localName: normalized,
    }
}

function getCurrentDomain(filePath) {
    const relativePath = path.relative(domainsRoot, filePath).replace(/\\/g, '/')
    if (relativePath.startsWith('..')) {
        return null
    }

    const [domainName] = relativePath.split('/')
    if (!domainName) {
        return null
    }

    const domainRoot = path.join(domainsRoot, domainName, 'src')
    const relativeToSrc = path.relative(domainRoot, filePath).replace(/\\/g, '/')
    return relativeToSrc.startsWith('..') ? null : domainName
}

function resolveModuleTargetFile({ domainName, moduleName, rest }) {
    const basePath = path.join(domainsRoot, domainName, 'src', moduleName, ...rest)
    return resolveFileLikePath(basePath)
}

function resolveDomainTargetFile({ domainName, specifier }) {
    const remainder = specifier.slice(`@ecoop/domains/${domainName}`.length)
    const cleaned = remainder.startsWith('/') ? remainder.slice(1) : remainder
    const targetBase = cleaned
        ? path.join(domainsRoot, domainName, 'src', cleaned)
        : path.join(domainsRoot, domainName, 'src', 'index')

    return resolveFileLikePath(targetBase)
}

function resolveFileLikePath(basePath) {
    const candidates = [
        basePath,
        `${basePath}.ts`,
        `${basePath}.tsx`,
        `${basePath}.mts`,
        `${basePath}.cts`,
        path.join(basePath, 'index.ts'),
        path.join(basePath, 'index.tsx'),
        path.join(basePath, 'index.mts'),
        path.join(basePath, 'index.cts'),
    ]

    for (const candidate of candidates) {
        if (existsSync(candidate) && lstatSync(candidate).isFile()) {
            return candidate
        }
    }

    return null
}

function resolveExportSource(barrelFile, exportedName) {
    const exportMap = getExportMap(barrelFile)
    return exportMap.get(exportedName) ?? null
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
    const exportMap = new Map()

    const directExportPattern =
        /^\s*export\s+(?:default\s+)?(?:type\s+)?(?:interface|type|class|function|const|let|var|enum)\s+([A-Za-z0-9_]+)/gm
    let match
    while ((match = directExportPattern.exec(content))) {
        exportMap.set(match[1], filePath)
    }

    if (/^\s*export\s+default\b/m.test(content)) {
        exportMap.set('default', filePath)
    }

    const exportFromPattern = /^\s*export\s+\{([\s\S]*?)\}\s+from\s+['"]([^'"]+)['"]/gm
    while ((match = exportFromPattern.exec(content))) {
        const [, clause, fromPath] = match
        const targetFile = resolveImportTarget(filePath, fromPath)
        if (!targetFile) {
            continue
        }

        const targetExports = getExportMap(targetFile, nextTrail)
        for (const entry of clause.split(',').map((part) => part.trim()).filter(Boolean)) {
            const [localName, exportedName] = entry
                .split(/\s+as\s+/i)
                .map((value) => value.trim())

            const sourceFile = targetExports.get(localName)
            if (!sourceFile) {
                continue
            }

            exportMap.set(exportedName || localName, sourceFile)
        }
    }

    const exportAllPattern = /^\s*export\s+\*\s+from\s+['"]([^'"]+)['"]/gm
    while ((match = exportAllPattern.exec(content))) {
        const [, fromPath] = match
        const targetFile = resolveImportTarget(filePath, fromPath)
        if (!targetFile) {
            continue
        }

        const targetExports = getExportMap(targetFile, nextTrail)
        for (const [exportedName, sourceFile] of targetExports) {
            if (exportedName === 'default') {
                continue
            }

            if (!exportMap.has(exportedName)) {
                exportMap.set(exportedName, sourceFile)
            }
        }
    }

    exportCache.set(filePath, exportMap)
    return exportMap
}

function resolveImportTarget(filePath, fromPath) {
    const resolvedPath = path.resolve(path.dirname(filePath), fromPath)
    return resolveFileLikePath(resolvedPath)
}

function toImportPath(filePath, targetFile) {
    let relative = path
        .relative(path.dirname(filePath), targetFile)
        .replace(/\\/g, '/')

    relative = relative.replace(/\.(ts|tsx|mts|cts)$/, '')
    relative = relative.replace(/\/index$/, '/')

    if (!relative.startsWith('.')) {
        relative = `./${relative}`
    }

    return relative
}