#!/usr/bin/env bun

import { spawnSync } from 'node:child_process'
import {
    existsSync,
    readFileSync,
    renameSync,
    rmSync,
    writeFileSync,
} from 'node:fs'
import path from 'node:path'

const folderName = process.argv[2]?.trim()

if (!folderName) {
    console.error(
        'Missing Providers folder name. Usage: bun run g:providers <folder_name>'
    )
    process.exit(1)
}

if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*$/.test(folderName)) {
    console.error(`Invalid folder name: ${folderName}`)
    process.exit(1)
}

const workspaceRoot = process.cwd()
const projectRoot = path.join(
    workspaceRoot,
    'libs',
    'shared',
    'providers',
    folderName
)
const projectSrc = path.join(projectRoot, 'src')

function runNxGenerate() {
    const args = [
        'nx',
        'g',
        '@nx/js:lib',
        folderName,
        `--directory=libs/shared/providers/${folderName}`,
        `--importPath=@ecoop/shared/providers/${folderName}`,
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
            `./lib/shared/${folderName}`,
            `./shared/${folderName}`
        )

        if (updatedIndex !== indexContents) {
            writeFileSync(generatedIndex, updatedIndex)
        }
    }

    if (existsSync(generatedLib)) {
        rmSync(generatedLib, { recursive: true, force: true })
    }
}

if (!existsSync(projectRoot)) {
    runNxGenerate()
}

flattenGeneratedScaffold()

console.log(`Providers project is ready: libs/shared/providers/${folderName}`)
