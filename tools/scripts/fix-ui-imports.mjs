import { readFileSync, readdirSync, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..', '..')

const targetArg = process.argv[2] || 'libs/ui/src'
const targetPath = path.resolve(repoRoot, targetArg)

const isCodeFile = (filePath) =>
    filePath.endsWith('.ts') || filePath.endsWith('.tsx')

const walk = (dir, files = []) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            if (entry.name === 'node_modules' || entry.name === 'dist') continue
            walk(fullPath, files)
            continue
        }
        if (entry.isFile() && isCodeFile(fullPath)) {
            files.push(fullPath)
        }
    }
    return files
}

const files = walk(targetPath)
const duplicateFromPattern = /\bfrom\s+from\s+(['"][^'"]+['"])/g
const cnImportPattern =
    /import\s*\{\s*cn\s*\}\s+from\s+(['"]@\/helpers\/tw-utils['"])\s*;?/g

const replacements = [
    {
        pattern: /(['"])@\/components(?:\/[^'"]*)?\1/g,
        replace: (match, quote) => `${quote}@ecoop/ui${quote}`,
    },
    {
        pattern: /(['"])@\/modules\/([^'"\/]+)(?:\/[^'"]*)?\1/g,
        replace: (match, quote, moduleName) =>
            `${quote}@ecoop/modules/${moduleName}${quote}`,
    },
    {
        pattern: /(['"])@\/shared\/([^'"\/]+)(?:\/[^'"]*)?\1/g,
        replace: (match, quote, sharedName) =>
            `${quote}@ecoop/shared/${sharedName}${quote}`,
    },
    {
        pattern: /(['"])@\/hooks(?:\/[^'"]*)?\1/g,
        replace: (match, quote) =>
            `${quote}@ecoop/shared/hooks${quote}`,
    },
    {
        pattern: /(['"])@\/types(?:\/[^'"]*)?\1/g,
        replace: (match, quote) =>
            `${quote}@ecoop/shared/types${quote}`,
    },
]

let duplicateFromFixCount = 0
let cnFixCount = 0
let aliasFixCount = 0

for (const filePath of files) {
    const original = readFileSync(filePath, 'utf8')
    let updated = original

    updated = updated.replace(duplicateFromPattern, (match, source) => {
        duplicateFromFixCount += 1
        return `from ${source}`
    })

    updated = updated.replace(cnImportPattern, 'import { cn } from $1')
    if (updated !== original && cnImportPattern.test(original)) {
        cnFixCount += 1
    }

    for (const { pattern, replace } of replacements) {
        const next = updated.replace(pattern, replace)
        if (next !== updated) {
            aliasFixCount += 1
            updated = next
        }
    }

    if (updated !== original) {
        writeFileSync(filePath, updated, 'utf8')
        // counts are tracked above
    }
}

console.log(`\nFixed duplicate 'from' in ${duplicateFromFixCount} import(s).`)
console.log(`Fixed cn import typo in ${cnFixCount} file(s).`)
console.log(`Rewrote alias imports in ${aliasFixCount} file(s).`)
