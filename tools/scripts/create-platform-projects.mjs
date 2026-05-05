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
const modulesRoot = path.join(root, 'libs', 'modules')
const platformsRoot = path.join(root, 'libs', 'platforms')
const checkOnly = process.argv.includes('--check')

function getDirectories(dir) {
    if (!existsSync(dir)) {
        return []
    }

    return readdirSync(dir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
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

function runNxGenerate(moduleName) {
    const targetPath = `libs/platforms/${moduleName}`
    const args = [
        'nx',
        'g',
        '@nx/js:lib',
        targetPath,
        `--name=${moduleName}`,
        `--importPath=@ecoop/platforms/${moduleName}`,
        '--verbose',
        '--bundler=none',
        '--linter=eslint',
        '--unitTestRunner=vitest',
    ]

    const command = `bun ${args.join(' ')}`
    if (checkOnly) {
        console.log(`DRY GENERATE: ${command}`)
        return
    }

    console.log(`RUN GENERATE: ${command}`)
    const result = spawnSync('bun', args, { stdio: 'inherit' })
    if (result.status !== 0) {
        throw new Error(`Generator failed for ${moduleName}`)
    }
}

function ensureProject(moduleName) {
    const projectJson = path.join(platformsRoot, moduleName, 'project.json')
    if (existsSync(projectJson)) {
        return
    }

    runNxGenerate(moduleName)
}

function clearGeneratedScaffold(moduleName) {
    const moduleSrc = path.join(platformsRoot, moduleName, 'src')
    const libDir = path.join(moduleSrc, 'lib')
    const indexPath = path.join(moduleSrc, 'index.ts')

    if (existsSync(libDir)) {
        if (checkOnly) {
            console.log(
                `DRY DELETE: ${path.relative(root, libDir).replace(/\\/g, '/')}`
            )
        } else {
            rmSync(libDir, { recursive: true, force: true })
        }
    }

    if (existsSync(indexPath)) {
        const content = readFileSync(indexPath, 'utf8').trim()
        const looksGenerated = /^export\s+\*\s+from\s+['"]\.\/lib/.test(content)
        if (looksGenerated) {
            if (checkOnly) {
                console.log(
                    `DRY DELETE: ${path
                        .relative(root, indexPath)
                        .replace(/\\/g, '/')}`
                )
            } else {
                rmSync(indexPath, { force: true })
            }
        }
    }
}

function moveModuleFiles(moduleName) {
    const sourceRoot = path.join(modulesRoot, moduleName)
    const targetRoot = path.join(platformsRoot, moduleName, 'src')

    if (!existsSync(sourceRoot)) {
        return
    }

    const files = collectAllFiles(sourceRoot)
    if (files.length === 0) {
        return
    }

    clearGeneratedScaffold(moduleName)

    for (const filePath of files) {
        const relPath = path.relative(sourceRoot, filePath)
        const destination = path.join(targetRoot, relPath)

        if (checkOnly) {
            console.log(
                `DRY MOVE: ${path
                    .relative(root, filePath)
                    .replace(/\\/g, '/')} -> ${path
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

    if (checkOnly) {
        console.log(
            `DRY DELETE: ${path.relative(root, sourceRoot).replace(/\\/g, '/')}`
        )
        return
    }

    rmSync(sourceRoot, { recursive: true, force: true })
}

function ensureIndexExports(moduleName) {
    const targetRoot = path.join(platformsRoot, moduleName, 'src')
    const indexPath = path.join(targetRoot, 'index.ts')

    if (!existsSync(targetRoot) || existsSync(indexPath)) {
        return
    }

    const entries = readdirSync(targetRoot, { withFileTypes: true })
    const exportFiles = entries
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name)
        .filter((name) => {
            if (name === 'index.ts') {
                return false
            }
            if (!/\.(ts|tsx)$/.test(name)) {
                return false
            }
            if (/\.d\.ts$/.test(name)) {
                return false
            }
            if (/\.(spec|test)\.(ts|tsx)$/.test(name)) {
                return false
            }
            return true
        })
        .sort()

    const lines = exportFiles.map((name) => {
        const base = name.replace(/\.(ts|tsx)$/, '')
        return `export * from './${base}'`
    })

    if (checkOnly) {
        console.log(
            `DRY INDEX: ${path.relative(root, indexPath).replace(/\\/g, '/')}`
        )
        return
    }

    writeFileSync(indexPath, `${lines.join('\n')}\n`, 'utf8')
}

function run() {
    const modules = getDirectories(modulesRoot)
    if (modules.length === 0) {
        console.log('No modules found under libs/modules.')
        return
    }

    for (const moduleName of modules) {
        ensureProject(moduleName)
        moveModuleFiles(moduleName)
        ensureIndexExports(moduleName)
    }

    console.log(
        checkOnly ? 'Dry-run complete.' : 'Platform migration complete.'
    )
}

run()
