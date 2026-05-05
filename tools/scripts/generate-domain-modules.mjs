#!/usr/bin/env bun
// Generates Nx libs for each module under libs/domains/*/modules/*
// Usage:
//   bun tools/scripts/generate-domain-modules.mjs --check   # dry-run (prints commands)
//   bun tools/scripts/generate-domain-modules.mjs          # actually runs generator
import { spawnSync } from 'node:child_process'
import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const domainsDir = path.join(root, 'libs', 'domains')
const checkOnly = process.argv.includes('--check')

function getDirectories(dir) {
    try {
        return readdirSync(dir, { withFileTypes: true })
            .filter((d) => d.isDirectory())
            .map((d) => d.name)
    } catch (e) {
        return []
    }
}

const domains = getDirectories(domainsDir)
for (const domain of domains) {
    const modulesDir = path.join(domainsDir, domain, 'modules')
    const modules = getDirectories(modulesDir)
    if (modules.length === 0) continue

    for (const mod of modules) {
        const target = `./libs/domains/${domain}/modules/${mod}`
        const args = [
            'nx',
            'g',
            '@nx/js:lib',
            target,
            '--bundler=none',
            '--linter=eslint',
            '--unitTestRunner=vitest',
        ]

        const pretty = `bun ${args.join(' ')}`
        if (checkOnly) {
            console.log(`DRY: ${pretty}`)
            continue
        }

        console.log(`Running: ${pretty}`)
        const res = spawnSync('bun', args, { stdio: 'inherit' })
        if (res.error || res.status !== 0) {
            console.error(
                'generator failed for',
                target,
                res.error ?? `exit ${res.status}`
            )
        }
    }
}

console.log('Done.')
