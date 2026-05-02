#!/usr/bin/env bun

import { spawnSync } from 'node:child_process'
import {
    existsSync,
    mkdirSync,
    readFileSync,
    readdirSync,
    renameSync,
    rmSync,
    rmdirSync,
    statSync,
    writeFileSync,
} from 'node:fs'
import path from 'node:path'

const folderName = process.argv[2]?.trim()

if (!folderName) {
    console.error(
        'Missing module folder name. Usage: bun run g:modules <folder_name>'
    )
    process.exit(1)
}

if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*$/.test(folderName)) {
    console.error(`Invalid folder name: ${folderName}`)
    process.exit(1)
}

const workspaceRoot = process.cwd()
const projectRoot = path.join(workspaceRoot, 'libs', 'modules', folderName)
const projectSrc = path.join(projectRoot, 'src')
const legacyModuleRoot = path.join(
    workspaceRoot,
    'libs',
    'modules',
    'src',
    folderName
)

function runNxGenerate() {
    const args = [
        'nx',
        'g',
        '@nx/js:lib',
        folderName,
        `--directory=libs/modules/${folderName}`,
        `--importPath=@ecoop/modules/${folderName}`,
        '--bundler=none',
        '--linter=eslint',
        '--unitTestRunner=vitest',
        '--no-interactive',
    ]

    const result = spawnSync('bunx', args, {
        cwd: workspaceRoot,
        stdio: 'inherit',
        shell: process.platform === 'win32',
    })

    if (result.status !== 0) {
        process.exit(result.status ?? 1)
    }
}

function flattenGeneratedScaffold() {
    const generatedLib = path.join(projectSrc, 'lib')
    const generatedIndex = path.join(projectSrc, 'index.ts')
    const generatedSource = path.join(generatedLib, `${folderName}.ts`)
    const generatedSpec = path.join(generatedLib, `${folderName}.spec.ts`)
    const projectSource = path.join(projectSrc, `${folderName}.ts`)
    const projectSpec = path.join(projectSrc, `${folderName}.spec.ts`)

    if (existsSync(generatedSource)) {
        renameSync(generatedSource, projectSource)
    }

    if (existsSync(generatedSpec)) {
        renameSync(generatedSpec, projectSpec)
    }

    if (existsSync(generatedIndex)) {
        const indexContents = readFileSync(generatedIndex, 'utf8')
        const updatedIndex = indexContents.replace(
            `./lib/${folderName}`,
            `./${folderName}`
        )

        if (updatedIndex !== indexContents) {
            writeFileSync(generatedIndex, updatedIndex)
        }
    }

    if (existsSync(generatedLib)) {
        rmSync(generatedLib, { recursive: true, force: true })
    }
}

function moveEntry(sourcePath, destinationPath) {
    try {
        renameSync(sourcePath, destinationPath)
    } catch (error) {
        if (error && error.code === 'EXDEV') {
            throw new Error(
                `Cross-device move is not supported for ${sourcePath}`
            )
        }

        throw error
    }
}

function mergeDirectory(sourceDir, destinationDir) {
    mkdirSync(destinationDir, { recursive: true })
    const entries = readdirSync(sourceDir, { withFileTypes: true })

    for (const entry of entries) {
        const sourcePath = path.join(sourceDir, entry.name)
        const destinationPath = path.join(destinationDir, entry.name)

        if (existsSync(destinationPath)) {
            const sourceStat = statSync(sourcePath)
            const destinationStat = statSync(destinationPath)

            if (sourceStat.isDirectory() && destinationStat.isDirectory()) {
                mergeDirectory(sourcePath, destinationPath)
                continue
            }

            throw new Error(`Destination already exists: ${destinationPath}`)
        }

        moveEntry(sourcePath, destinationPath)
    }

    rmdirSync(sourceDir)
}

function migrateLegacyModule() {
    if (!existsSync(legacyModuleRoot)) {
        return
    }

    if (!statSync(legacyModuleRoot).isDirectory()) {
        throw new Error(
            `Legacy module path is not a directory: ${legacyModuleRoot}`
        )
    }

    mkdirSync(projectSrc, { recursive: true })

    const legacyEntries = readdirSync(legacyModuleRoot, { withFileTypes: true })
    for (const entry of legacyEntries) {
        const sourcePath = path.join(legacyModuleRoot, entry.name)
        const destinationPath = path.join(projectSrc, entry.name)

        if (existsSync(destinationPath)) {
            if (
                entry.isDirectory() &&
                statSync(destinationPath).isDirectory()
            ) {
                mergeDirectory(sourcePath, destinationPath)
                continue
            }

            throw new Error(
                `Cannot move ${sourcePath}. Destination exists: ${destinationPath}`
            )
        }

        moveEntry(sourcePath, destinationPath)
    }

    rmdirSync(legacyModuleRoot)
}

if (!existsSync(projectRoot)) {
    runNxGenerate()
}

flattenGeneratedScaffold()
migrateLegacyModule()

console.log(`Module project is ready: libs/modules/${folderName}`)
