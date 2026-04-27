import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const DEFAULT_EXTENSIONS = new Set([
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    '.mts',
    '.cts',
])
const DEFAULT_SKIP_DIRS = new Set([
    '.git',
    '.nx',
    'dist',
    'build',
    'coverage',
    'node_modules',
])

const repoRoot = process.cwd()
const targetArg = process.argv[2] || 'libs/ui/src'
const targetPath = path.resolve(repoRoot, targetArg)

const isCodeFile = (filePath) => DEFAULT_EXTENSIONS.has(path.extname(filePath))

async function collectFiles(rootDir) {
    const files = []
    const stack = [rootDir]

    while (stack.length > 0) {
        const current = stack.pop()
        const entries = await readdir(current, { withFileTypes: true })

        for (const entry of entries) {
            const fullPath = path.join(current, entry.name)
            if (entry.isDirectory()) {
                if (!DEFAULT_SKIP_DIRS.has(entry.name)) {
                    stack.push(fullPath)
                }
                continue
            }

            if (entry.isFile() && isCodeFile(fullPath)) {
                files.push(fullPath)
            }
        }
    }

    return files
}

function convertDefaultExport(content) {
    const trimmed = content.trimEnd()
    const lines = trimmed.split('\n')
    let index = lines.length - 1

    while (index >= 0 && lines[index].trim() === '') {
        index -= 1
    }

    if (index < 0) {
        return { updated: false, content }
    }

    const lastLine = lines[index]
    const match = lastLine.match(
        /^\s*export\s+default\s+([A-Za-z0-9_]+)\s*;?\s*$/
    )
    if (!match) {
        return { updated: false, content }
    }

    const exportName = match[1]
    lines[index] = lastLine.replace(match[0], `export { ${exportName} }`)

    const updatedContent = [...lines, ''].join('\n')
    return { updated: updatedContent !== content, content: updatedContent }
}

const files = await collectFiles(targetPath)
let updatedFiles = 0
let skippedFiles = 0

for (const filePath of files) {
    const original = await readFile(filePath, 'utf8')
    const { updated, content } = convertDefaultExport(original)

    if (!updated) {
        skippedFiles += 1
        continue
    }

    await writeFile(filePath, content, 'utf8')
    updatedFiles += 1
}

console.log(`Converted default exports in ${updatedFiles} file(s).`)
console.log(`Skipped ${skippedFiles} file(s).`)
