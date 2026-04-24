#!/usr/bin/env bun

import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'

const workspaceRoot = process.cwd()
const legacyModulesSrc = path.join(workspaceRoot, 'libs', 'modules', 'src')

if (!existsSync(legacyModulesSrc)) {
    console.error('Missing source directory: libs/modules/src')
    process.exit(1)
}

const folderNames = readdirSync(legacyModulesSrc, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b))

if (folderNames.length === 0) {
    console.log('No folders found in libs/modules/src')
    process.exit(0)
}

console.log(`Found ${folderNames.length} module folders in libs/modules/src`)

for (const folderName of folderNames) {
    console.log(`\nMigrating: ${folderName}`)

    const result = spawnSync('bun', ['run', 'g:modules', folderName], {
        cwd: workspaceRoot,
        stdio: 'inherit',
        shell: process.platform === 'win32',
    })

    if (result.status !== 0) {
        console.error(`Migration failed for: ${folderName}`)
        process.exit(result.status ?? 1)
    }
}

console.log('\nAll module folders migrated successfully.')
