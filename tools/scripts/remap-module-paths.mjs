import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'

const require = createRequire(import.meta.url)
const { mapping } = require('../move-modules-to-domains.cjs')

const rootDir = process.cwd()
const tsconfigPath = path.join(rootDir, 'tsconfig.base.json')
const checkOnly = process.argv.includes('--check')

const originalText = await readFile(tsconfigPath, 'utf8')
let updatedText = originalText
const replacements = []

for (const [domain, modules] of Object.entries(mapping)) {
    for (const moduleName of modules) {
        const oldPath = `libs/modules/${moduleName}/src/index.ts`
        const newPath = `libs/domains/${domain}/src/index.ts`

        if (!existsSync(path.join(rootDir, newPath))) {
            continue
        }

        if (!updatedText.includes(oldPath)) {
            continue
        }

        updatedText = updatedText.replaceAll(oldPath, newPath)
        replacements.push({ moduleName, domain, oldPath, newPath })
    }
}

if (replacements.length === 0) {
    console.log('No module path aliases needed remap.')
    process.exit(0)
}

if (checkOnly) {
    console.log(`Found ${replacements.length} module path alias remap(s).`)
    for (const entry of replacements) {
        console.log(
            `${entry.moduleName}: ${entry.oldPath} -> ${entry.newPath} (${entry.domain})`
        )
    }
    process.exit(1)
}

await writeFile(tsconfigPath, updatedText, 'utf8')

console.log(`Updated ${replacements.length} module path alias(es).`)
