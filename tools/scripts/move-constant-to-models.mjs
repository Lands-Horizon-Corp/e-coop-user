#!/usr/bin/env node
import fs from 'fs/promises'
import path from 'path'

const ROOT = process.cwd()
const DOMAINS_ROOT = path.join(ROOT, 'libs', 'domains')

const EXTS = new Set([
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    '.mjs',
    '.cjs',
    '.mts',
    '.cts',
])

function norm(p) {
    return p.split(path.sep).join('/')
}

async function* walk(dir) {
    for await (const d of await fs.opendir(dir)) {
        const entry = path.join(dir, d.name)
        if (d.isDirectory()) {
            if (
                d.name === 'node_modules' ||
                d.name === '.git' ||
                d.name === 'dist' ||
                d.name === 'tmp'
            )
                continue
            yield* walk(entry)
        } else if (d.isFile()) {
            yield entry
        }
    }
}

async function findConstantFiles() {
    const out = []
    try {
        for await (const f of walk(DOMAINS_ROOT)) {
            if (f.endsWith('.constant.ts')) out.push(f)
        }
    } catch (e) {
        console.error('Error walking domains root', e.message)
    }
    return out
}

async function moveFiles(files) {
    const mappings = []
    for (const oldPath of files) {
        const rel = path.relative(DOMAINS_ROOT, oldPath)
        const parts = rel.split(path.sep)
        const modulesIdx = parts.indexOf('modules')
        if (modulesIdx === -1 || modulesIdx + 1 >= parts.length) {
            console.warn('skip (no modules segment):', oldPath)
            continue
        }
        const domainName = parts.slice(0, modulesIdx).join(path.sep)
        const moduleName = parts[modulesIdx + 1]
        const destDir = path.join(
            DOMAINS_ROOT,
            domainName,
            'models',
            moduleName
        )
        await fs.mkdir(destDir, { recursive: true })
        const fileName = path.basename(oldPath)
        const newPath = path.join(destDir, fileName)
        await fs.rename(oldPath, newPath)
        mappings.push({ oldPath: norm(oldPath), newPath: norm(newPath) })
        console.log('moved:', norm(oldPath), '→', norm(newPath))
    }
    return mappings
}

async function updateImports(mappings) {
    if (!mappings.length) return 0
    const files = []
    for await (const f of walk(ROOT)) {
        const rel = path.relative(ROOT, f)
        if (
            rel.startsWith('node_modules') ||
            rel.startsWith('dist') ||
            rel.startsWith('.git') ||
            rel.startsWith('tmp')
        )
            continue
        if (EXTS.has(path.extname(f))) files.push(f)
    }

    let changedCount = 0
    for (const file of files) {
        let txt = await fs.readFile(file, 'utf8')
        let orig = txt
        for (const m of mappings) {
            const oldFrag = m.oldPath.split('/libs/').pop() || m.oldPath
            const newFrag = m.newPath.split('/libs/').pop() || m.newPath
            const oldRel = oldFrag.replace(/\\/g, '/')
            const newRel = newFrag.replace(/\\/g, '/')
            txt = txt.split(oldRel).join(newRel)
            txt = txt.split(m.oldPath).join(m.newPath)
            const modulesPattern = /modules\/[a-zA-Z0-9_\-]+\/src/g
            txt = txt.replace(modulesPattern, (match) =>
                match.replace('/modules/', '/models/').replace('/src', '')
            )
        }
        if (txt !== orig) {
            await fs.writeFile(file, txt, 'utf8')
            changedCount++
            console.log('updated imports in', norm(path.relative(ROOT, file)))
        }
    }
    return changedCount
}

async function main() {
    console.log('Scanning for *.constant.ts under', norm(DOMAINS_ROOT))
    const files = await findConstantFiles()
    if (!files.length) {
        console.log('No *.constant.ts files found.')
        return
    }
    const mappings = await moveFiles(files)
    const updates = await updateImports(mappings)
    console.log(
        `Done. moved ${mappings.length} files. updated imports in ${updates} files.`
    )
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})
