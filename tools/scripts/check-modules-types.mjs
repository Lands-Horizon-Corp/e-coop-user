import { spawnSync } from 'child_process'
import { existsSync, readdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..', '..')
const modulesDir = path.join(repoRoot, 'libs', 'modules')

if (!existsSync(modulesDir)) {
    console.error(`Modules folder not found: ${modulesDir}`)
    process.exit(1)
}

const moduleDirs = readdirSync(modulesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)

const tsconfigs = moduleDirs
    .map((name) => ({
        name,
        tsconfig: path.join(modulesDir, name, 'tsconfig.json'),
    }))
    .filter((entry) => existsSync(entry.tsconfig))

if (tsconfigs.length === 0) {
    console.error('No module tsconfig.json files found under libs/modules.')
    process.exit(1)
}

const bunxCmd = process.platform === 'win32' ? 'bunx.cmd' : 'bunx'
const failures = []

for (const { name, tsconfig } of tsconfigs) {
    console.log(`\n=== typecheck: ${name} ===`)
    const result = spawnSync(bunxCmd, ['tsc', '-b', tsconfig], {
        cwd: repoRoot,
        stdio: 'inherit',
        shell: false,
    })

    if (result.status !== 0) {
        failures.push(name)
    }
}

if (failures.length > 0) {
    console.error('\nTypecheck failed in modules:')
    for (const name of failures) {
        console.error(`- ${name}`)
    }
    process.exit(1)
}

console.log('\nTypecheck passed for all modules.')
