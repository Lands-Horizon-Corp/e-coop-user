import fs from 'fs'
import path from 'path'

const tsconfig = JSON.parse(fs.readFileSync('./tsconfig.base.json', 'utf8'))
const validPaths = new Set(Object.keys(tsconfig.compilerOptions.paths))
const domainModules = [...validPaths].filter(
    (p) => p.startsWith('@ecoop/domains/') && p.includes('/modules/')
)

function resolvePath(p) {
    if (validPaths.has(p)) return p

    if (p.startsWith('@ecoop/modules/')) {
        const name = p.replace('@ecoop/modules/', '')

        const platform = `@ecoop/platforms/${name}`
        if (validPaths.has(platform)) return platform

        const domain = domainModules.find((d) => d.endsWith(`/modules/${name}`))
        if (domain) return domain
    }

    if (p.startsWith('@ecoop/domains/') && p.split('/').length === 3) {
        const models = `${p}/models`
        if (validPaths.has(models)) return models
    }

    if (p === '@ecoop/ui') return '@ecoop/ui/core'

    return p
}

function processDir(dir) {
    if (!fs.existsSync(dir)) return

    for (const file of fs.readdirSync(dir)) {
        const full = path.join(dir, file)

        if (fs.statSync(full).isDirectory()) {
            if (!['node_modules', 'dist', 'tmp'].includes(file)) {
                processDir(full)
            }
        } else if (full.endsWith('.ts') || full.endsWith('.tsx')) {
            const content = fs.readFileSync(full, 'utf8')
            let updated = false

            const replaced = content
                .replace(
                    /(from\s+['"])(@ecoop\/[^'"]+)(['"])/g,
                    (m, pre, p, post) => {
                        const next = resolvePath(p)
                        if (next !== p) updated = true
                        return `${pre}${next}${post}`
                    }
                )
                .replace(
                    /(import\s*\(\s*['"])(@ecoop\/[^'"]+)(['"])/g,
                    (m, pre, p, post) => {
                        const next = resolvePath(p)
                        if (next !== p) updated = true
                        return `${pre}${next}${post}`
                    }
                )
                .replace(
                    /(['"]\.\.?[^'"]+)-constants(['"])/g,
                    (m, pre, post) => {
                        updated = true
                        return `${pre}.constants${post}`
                    }
                )
                .replace(
                    /import\s*{\s*useDebounce\s*}\s*from\s*['"]\.\/use-debounce['"]/g,
                    () => {
                        updated = true
                        return `import useDebounce from './use-debounce'`
                    }
                )

            if (updated) {
                fs.writeFileSync(full, replaced, 'utf8')
                console.log(`Updated: ${full}`)
            }
        }
    }
}

processDir('./libs')
