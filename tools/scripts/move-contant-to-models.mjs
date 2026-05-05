#!/usr/bin/env node
import fs from 'fs/promises'
import path from 'path'

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')
}

async function exists(p) {
    try {
        await fs.access(p)
        return true
    } catch (e) {
        return false
    }
}

async function walk(dir, cb) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    for (const e of entries) {
        const full = path.join(dir, e.name)
        if (e.isDirectory()) await walk(full, cb)
        else await cb(full)
    }
}

async function main() {
    const root = process.cwd()
    const domainsRoot = path.join(root, 'libs', 'domains')
    if (!(await exists(domainsRoot))) {
        console.error('No libs/domains folder found. Run from repo root.')
        process.exit(1)
    }

    const moved = []

    const domainDirs = await fs.readdir(domainsRoot, { withFileTypes: true })
    for (const d of domainDirs) {
        if (!d.isDirectory()) continue
        const domain = d.name
        const modulesDir = path.join(domainsRoot, domain, 'modules')
        if (!(await exists(modulesDir))) continue
        const moduleFolders = await fs.readdir(modulesDir, {
            withFileTypes: true,
        })
        for (const m of moduleFolders) {
            if (!m.isDirectory()) continue
            const moduleName = m.name
            const srcDir = path.join(modulesDir, moduleName, 'src')
            if (!(await exists(srcDir))) continue
            // find *.contant.ts files under srcDir
            await walk(srcDir, async (file) => {
                if (file.endsWith('.contant.ts')) {
                    const destDir = path.join(
                        domainsRoot,
                        domain,
                        'models',
                        moduleName
                    )
                    await fs.mkdir(destDir, { recursive: true })
                    const destPath = path.join(destDir, path.basename(file))
                    await fs.rename(file, destPath)
                    moved.push({
                        domain,
                        moduleName,
                        old: path.relative(root, file).replace(/\\/g, '/'),
                        new: path.relative(root, destPath).replace(/\\/g, '/'),
                    })
                    console.log('Moved', file, '→', destPath)
                }
            })
        }
    }

    if (moved.length === 0) {
        console.log('No *.contant.ts files found to move.')
        return
    }

    // update imports in workspace files
    const exts = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']
    const ignoreDirs = ['node_modules', '.git', 'dist', 'build', 'public']
    const allFiles = []
    async function gather(dir) {
        const ents = await fs.readdir(dir, { withFileTypes: true })
        for (const e of ents) {
            if (ignoreDirs.includes(e.name)) continue
            const full = path.join(dir, e.name)
            if (e.isDirectory()) await gather(full)
            else if (exts.includes(path.extname(e.name))) allFiles.push(full)
        }
    }
    await gather(root)

    for (const f of allFiles) {
        let content = await fs.readFile(f, 'utf8')
        let original = content
        for (const m of moved) {
            const domain = m.domain
            const moduleName = m.moduleName
            const filename = path.basename(m.new).replace(/\.ts$/, '')
            // replace occurrences like libs/domains/X/modules/Y/.../file or domains/X/modules/Y/...
            const pat1 = new RegExp(
                escapeRegExp(`libs/domains/${domain}/modules/${moduleName}`) +
                    '(?:/src)?',
                'g'
            )
            const rep1 = `libs/domains/${domain}/models/${moduleName}`
            content = content.replace(pat1, rep1)
            const pat2 = new RegExp(
                escapeRegExp(`domains/${domain}/modules/${moduleName}`) +
                    '(?:/src)?',
                'g'
            )
            const rep2 = `domains/${domain}/models/${moduleName}`
            content = content.replace(pat2, rep2)
            // also try replacing /domains/X/modules/Y
            const pat3 = new RegExp(
                escapeRegExp(`/domains/${domain}/modules/${moduleName}`) +
                    '(?:/src)?',
                'g'
            )
            const rep3 = `/domains/${domain}/models/${moduleName}`
            content = content.replace(pat3, rep3)
        }
        if (content !== original) {
            await fs.writeFile(f, content, 'utf8')
            console.log('Updated imports in', f)
        }
    }

    console.log('\nDone. Summary:')
    moved.forEach((m) => console.log('-', m.old, '→', m.new))
}

main().catch((err) => {
    console.error(err)
    process.exit(2)
})
