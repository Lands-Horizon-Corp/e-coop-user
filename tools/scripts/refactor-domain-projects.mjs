#!/usr/bin/env bun
import { spawnSync } from 'node:child_process'
import {
    existsSync,
    mkdirSync,
    readFileSync,
    readdirSync,
    renameSync,
    rmSync,
    writeFileSync,
} from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const domainsRoot = path.join(root, 'libs', 'domains')
const checkOnly = process.argv.includes('--check')

function getDirectories(dir) {
    if (!existsSync(dir)) {
        return []
    }

    return readdirSync(dir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
}

function collectTypeFiles(dir, acc = []) {
    if (!existsSync(dir)) {
        return acc
    }

    const entries = readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            collectTypeFiles(fullPath, acc)
            continue
        }

        if (
            entry.name.endsWith('.types.ts') ||
            entry.name.endsWith('.validation.ts')
        ) {
            acc.push(fullPath)
        }
    }

    return acc
}

function collectAllFiles(dir, acc = []) {
    if (!existsSync(dir)) {
        return acc
    }

    const entries = readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            collectAllFiles(fullPath, acc)
            continue
        }

        acc.push(fullPath)
    }

    return acc
}

function isModelFile(filePath) {
    return filePath.endsWith('.types.ts') || filePath.endsWith('.validation.ts')
}

function runNxGenerate(targetPath, importPath, projectName) {
    const args = [
        'nx',
        'g',
        '@nx/js:lib',
        targetPath,
        '--bundler=none',
        '--linter=eslint',
        '--unitTestRunner=vitest',
        `--importPath=${importPath}`,
        `--name=${projectName}`,
    ]

    const command = `bun ${args.join(' ')}`
    if (checkOnly) {
        console.log(`DRY GENERATE: ${command}`)
        return
    }

    console.log(`RUN GENERATE: ${command}`)
    const result = spawnSync('bun', args, { stdio: 'inherit' })
    if (result.status !== 0) {
        throw new Error(`Generator failed for ${targetPath}`)
    }
}

function ensureProject(domainName, projectType, moduleName = null) {
    const projectRoot = moduleName
        ? path.join(domainsRoot, domainName, 'modules', moduleName)
        : path.join(domainsRoot, domainName, projectType)
    const projectJson = path.join(projectRoot, 'project.json')

    if (existsSync(projectJson)) {
        return
    }

    const nxTarget = moduleName
        ? `./libs/domains/${domainName}/modules/${moduleName}`
        : `./libs/domains/${domainName}/${projectType}`

    const importPath = moduleName
        ? `@ecoop/domains/${domainName}/modules/${moduleName}`
        : `@ecoop/domains/${domainName}/${projectType}`

    const projectName = moduleName
        ? `${domainName}-${moduleName}`
        : `${domainName}-${projectType}`

    runNxGenerate(nxTarget, importPath, projectName)
}

function clearGeneratedModuleScaffold(domainName, moduleName) {
    const moduleSrc = path.join(
        domainsRoot,
        domainName,
        'modules',
        moduleName,
        'src'
    )
    const moduleLibDir = path.join(moduleSrc, 'lib')
    const moduleIndex = path.join(moduleSrc, 'index.ts')

    if (existsSync(moduleLibDir)) {
        if (checkOnly) {
            console.log(
                `DRY DELETE: ${path.relative(root, moduleLibDir).replace(/\\/g, '/')}`
            )
        } else {
            rmSync(moduleLibDir, { recursive: true, force: true })
        }
    }

    if (existsSync(moduleIndex)) {
        const content = readFileSync(moduleIndex, 'utf8').trim()
        const looksGenerated = /^export\s+\*\s+from\s+['"]\.\/lib\//.test(
            content
        )
        if (looksGenerated) {
            if (checkOnly) {
                console.log(
                    `DRY DELETE: ${path.relative(root, moduleIndex).replace(/\\/g, '/')}`
                )
            } else {
                rmSync(moduleIndex, { force: true })
            }
        }
    }
}

function clearGeneratedModelScaffold(domainName) {
    const modelSrc = path.join(domainsRoot, domainName, 'models', 'src')
    const generatedFiles = [
        path.join(modelSrc, 'index.ts'),
        path.join(modelSrc, 'lib', 'models.ts'),
        path.join(modelSrc, 'lib', 'models.spec.ts'),
    ]

    for (const filePath of generatedFiles) {
        if (!existsSync(filePath)) {
            continue
        }

        if (checkOnly) {
            console.log(
                `DRY DELETE: ${path.relative(root, filePath).replace(/\\/g, '/')}`
            )
            continue
        }

        rmSync(filePath, { force: true })
    }
}

function moveModuleFilesToProject(domainName, moduleName) {
    const legacyModuleSrc = path.join(
        domainsRoot,
        domainName,
        'src',
        moduleName
    )
    const projectModuleSrc = path.join(
        domainsRoot,
        domainName,
        'modules',
        moduleName,
        'src'
    )

    if (!existsSync(legacyModuleSrc)) {
        return
    }

    const files = collectAllFiles(legacyModuleSrc).filter(
        (filePath) => !isModelFile(filePath)
    )
    if (files.length === 0) {
        return
    }

    clearGeneratedModuleScaffold(domainName, moduleName)

    for (const filePath of files) {
        const relPath = path.relative(legacyModuleSrc, filePath)
        const destination = path.join(projectModuleSrc, relPath)

        if (checkOnly) {
            console.log(
                `DRY MOVE: ${path.relative(root, filePath).replace(/\\/g, '/')} -> ${path
                    .relative(root, destination)
                    .replace(/\\/g, '/')}`
            )
            continue
        }

        mkdirSync(path.dirname(destination), { recursive: true })
        if (existsSync(destination)) {
            rmSync(destination, { force: true })
        }
        renameSync(filePath, destination)
    }
}

function ensureModelIndex(domainName) {
    const modelIndexPath = path.join(
        domainsRoot,
        domainName,
        'models',
        'src',
        'index.ts'
    )
    if (!existsSync(modelIndexPath)) {
        return []
    }

    const lines = readFileSync(modelIndexPath, 'utf8')
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.startsWith('export * from '))

    return lines
}

function updateModelIndex(domainName, exportStatements) {
    const modelIndexPath = path.join(
        domainsRoot,
        domainName,
        'models',
        'src',
        'index.ts'
    )
    const unique = new Set([
        ...ensureModelIndex(domainName),
        ...exportStatements,
    ])
    const body = [
        '// Auto-generated exports for domain model types',
        ...Array.from(unique).sort(),
        '',
    ]

    if (checkOnly) {
        console.log(
            `DRY INDEX: ${path.relative(root, modelIndexPath).replace(/\\/g, '/')}`
        )
        return
    }

    mkdirSync(path.dirname(modelIndexPath), { recursive: true })
    writeFileSync(modelIndexPath, `${body.join('\n')}`, 'utf8')
}

function moveTypesToModels(domainName, moduleName) {
    const moduleSrcRoot = path.join(domainsRoot, domainName, 'src', moduleName)
    const typeFiles = collectTypeFiles(moduleSrcRoot)
    const exportsForModelIndex = []

    for (const sourceFile of typeFiles) {
        const relInsideModule = path
            .relative(moduleSrcRoot, sourceFile)
            .replace(/\\/g, '/')
        const destination = path.join(
            domainsRoot,
            domainName,
            'models',
            'src',
            'lib',
            moduleName,
            relInsideModule
        )

        const exportPath = `./lib/${moduleName}/${relInsideModule
            .replace(/\\/g, '/')
            .replace(/\.ts$/, '')}`
        exportsForModelIndex.push(`export * from '${exportPath}'`)

        if (checkOnly) {
            console.log(
                `DRY MOVE: ${path.relative(root, sourceFile).replace(/\\/g, '/')} -> ${path
                    .relative(root, destination)
                    .replace(/\\/g, '/')}`
            )
            continue
        }

        mkdirSync(path.dirname(destination), { recursive: true })
        if (existsSync(destination)) {
            rmSync(destination, { force: true })
        }
        renameSync(sourceFile, destination)
    }

    return exportsForModelIndex
}

function run() {
    const domains = getDirectories(domainsRoot)
    for (const domainName of domains) {
        const srcRoot = path.join(domainsRoot, domainName, 'src')
        if (!existsSync(srcRoot)) {
            continue
        }

        const moduleNames = getDirectories(srcRoot)
        if (moduleNames.length === 0) {
            continue
        }

        ensureProject(domainName, 'models')
        clearGeneratedModelScaffold(domainName)

        const exportStatements = []
        for (const moduleName of moduleNames) {
            ensureProject(domainName, 'modules', moduleName)
            moveModuleFilesToProject(domainName, moduleName)
            exportStatements.push(...moveTypesToModels(domainName, moduleName))
        }

        updateModelIndex(domainName, exportStatements)
    }

    console.log(checkOnly ? 'Dry-run complete.' : 'Migration complete.')
}

run()
