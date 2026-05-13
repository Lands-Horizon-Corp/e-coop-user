import { readFile, readdir, stat, writeFile } from 'fs/promises'
import path from 'path'

const LIBS_DIR = './libs'

const fileExists = async (p) => {
    try {
        const s = await stat(p)
        return s.isFile()
    } catch {
        return false
    }
}

const resolveTsModule = async (baseDir, importPath) => {
    if (!importPath.startsWith('.')) return true

    const target = path.join(baseDir, importPath)

    try {
        const s = await stat(target)
        if (s.isDirectory()) {
            for (const ext of ['.ts', '.tsx', '.js', '.jsx', '.d.ts']) {
                if (await fileExists(path.join(target, `index${ext}`)))
                    return true
            }
        } else if (s.isFile()) {
            return true
        }
    } catch {
        /* */
    }

    for (const ext of ['.ts', '.tsx', '.js', '.jsx', '.d.ts']) {
        if (await fileExists(`${target}${ext}`)) return true
    }

    return false
}

const findConstantsFiles = async (dir, fileList = []) => {
    let entries
    try {
        entries = await readdir(dir, { withFileTypes: true })
    } catch {
        return fileList
    }

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (
            entry.isDirectory() &&
            entry.name !== 'node_modules' &&
            entry.name !== 'dist'
        ) {
            await findConstantsFiles(fullPath, fileList)
        } else if (
            entry.isFile() &&
            /\.(constants?|contants)\.ts$/.test(entry.name)
        ) {
            fileList.push(fullPath)
        }
    }
    return fileList
}

const processFile = async (filePath, projectRoot) => {
    const content = await readFile(filePath, 'utf-8')
    const lines = content.split('\n')
    let modified = false

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const match = line.match(/^(\s*export\s+.*from\s+['"])([^'"]+)(['"])/)

        if (match) {
            const importPath = match[2]
            if (importPath.startsWith('.')) {
                const exists = await resolveTsModule(
                    path.dirname(filePath),
                    importPath
                )
                if (!exists) {
                    lines[i] = `// ${line}`
                    modified = true
                }
            }
        }
    }

    if (filePath.replace(/\\/g, '/').includes('/models/')) {
        const constantsFiles = await findConstantsFiles(projectRoot)
        const indexContentStr = lines.join('\n')

        for (const constFile of constantsFiles) {
            let relativePath = path
                .relative(path.dirname(filePath), constFile)
                .replace(/\\/g, '/')
            if (!relativePath.startsWith('.')) {
                relativePath = `./${relativePath}`
            }
            relativePath = relativePath.replace(/\.ts$/, '')

            if (!indexContentStr.includes(relativePath)) {
                lines.push(`export * from '${relativePath}';`)
                modified = true
            }
        }
    }

    if (modified) {
        await writeFile(filePath, lines.join('\n'))
        console.log(`Updated: ${filePath}`)
    }
}

const walk = async (dir, currentModelsRoot = null) => {
    let entries
    try {
        entries = await readdir(dir, { withFileTypes: true })
    } catch {
        return
    }

    const normalizedDir = dir.replace(/\\/g, '/')
    const isModelsDir = normalizedDir.endsWith('/models')
    const modelsRoot = isModelsDir ? dir : currentModelsRoot

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            if (entry.name !== 'node_modules' && entry.name !== 'dist') {
                await walk(fullPath, modelsRoot)
            }
        } else if (entry.isFile() && entry.name === 'index.ts') {
            await processFile(fullPath, modelsRoot || path.dirname(fullPath))
        }
    }
}

walk(LIBS_DIR)
    .then(() => console.log('Finished scanning and fixing exports.'))
    .catch((err) => console.error(err))
