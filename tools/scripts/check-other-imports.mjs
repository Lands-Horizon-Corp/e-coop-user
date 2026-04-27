import path from 'node:path'

import {
    checkModuleFolder,
    fixModuleFolder,
    formatIssue,
    getModuleNames,
} from './import-path-checker.mjs'

const rootDir = process.cwd()
const modulesDir = path.join(rootDir, 'libs', 'modules')
const scanRoots = [
    path.join(rootDir, 'apps'),
    path.join(rootDir, 'libs', 'shared'),
    path.join(rootDir, 'libs', 'ui'),
]

const fix = process.argv.includes('--fix')
const moduleNames = await getModuleNames(modulesDir)
let totalIssues = 0
let totalFixedFiles = 0

for (const scanRoot of scanRoots) {
    const results = fix
        ? await fixModuleFolder({
              moduleDir: scanRoot,
              moduleNames,
              modulesDir,
          })
        : await checkModuleFolder({
              moduleDir: scanRoot,
              moduleNames,
              modulesDir,
          })

    if (results.length === 0) {
        continue
    }

    console.log(`\n${path.relative(rootDir, scanRoot).replace(/\\/g, '/')}`)
    for (const result of results) {
        for (const issue of result.issues) {
            totalIssues += 1
            console.log(
                `  ${formatIssue({
                    filePath: result.filePath,
                    content: result.content,
                    issue,
                    rootDir,
                })}`
            )
        }

        if (fix && result.updated) {
            totalFixedFiles += 1
        }
    }
}

if (totalIssues > 0) {
    const suffix = fix ? 'Fixed' : 'Found'
    console.error(`\n${suffix} ${totalIssues} invalid module import(s).`)
    if (!fix) {
        process.exit(1)
    }
    if (totalFixedFiles > 0) {
        console.log(`Updated ${totalFixedFiles} file(s).`)
    }
    process.exit(0)
}

console.log('No invalid module imports found.')
