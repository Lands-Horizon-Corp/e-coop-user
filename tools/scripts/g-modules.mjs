#!/usr/bin/env bun

import { spawnSync } from 'node:child_process'
import {
    existsSync,
    mkdirSync,
    readdirSync,
    renameSync,
    rmSync,
    rmdirSync,
    statSync,
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
        `--importPath=@e-coop-monorepo/modules/${folderName}`,
        '--bundler=none',
        '--linter=none',
        '--unitTestRunner=none',
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

function removeGeneratedScaffold() {
    const generatedIndex = path.join(projectSrc, 'index.ts')
    const generatedLib = path.join(projectSrc, 'lib')

    if (existsSync(generatedIndex)) {
        rmSync(generatedIndex, { force: true })
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

removeGeneratedScaffold()
migrateLegacyModule()

console.log(`Module project is ready: libs/modules/${folderName}`)
