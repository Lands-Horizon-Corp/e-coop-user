import { spawn } from 'node:child_process'
import { createWriteStream, promises as fs } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const repoRoot = resolve(__dirname, '..', '..')
const domainsRoot = resolve(repoRoot, 'libs', 'domains')
const outputPath = resolve(repoRoot, 'typecheck-results-domains.txt')
const nxBin = resolve(repoRoot, 'node_modules', 'nx', 'bin', 'nx.js')

const outputStream = createWriteStream(outputPath, { flags: 'w' })

const readProjectNames = async (rootDir) => {
    const names = new Set()

    const walk = async (dir) => {
        const entries = await fs.readdir(dir, { withFileTypes: true })
        for (const entry of entries) {
            if (entry.name.startsWith('.')) continue
            const fullPath = join(dir, entry.name)
            if (entry.isDirectory()) {
                await walk(fullPath)
                continue
            }
            if (entry.isFile() && entry.name === 'project.json') {
                try {
                    const content = await fs.readFile(fullPath, 'utf8')
                    const json = JSON.parse(content)
                    if (json?.name) names.add(String(json.name))
                } catch (error) {
                    outputStream.write(
                        `Failed to read ${fullPath}: ${String(error)}\n`
                    )
                }
            }
        }
    }

    await walk(rootDir)
    return Array.from(names)
}

const runNxProject = (project) =>
    new Promise((resolvePromise, rejectPromise) => {
        const child = spawn(
            'node',
            [nxBin, 'run', `${project}:typecheck`, '--skip-nx-cache'],
            {
                cwd: repoRoot,
                env: {
                    ...process.env,
                    NX_DAEMON: 'false',
                    NX_CACHE: 'false',
                },
                stdio: ['ignore', 'pipe', 'pipe'],
            }
        )

        child.stdout.pipe(outputStream, { end: false })
        child.stderr.pipe(outputStream, { end: false })

        child.on('close', (code) => {
            if (typeof code === 'number' && code === 0) {
                resolvePromise()
            } else {
                rejectPromise(new Error(`Nx run failed: ${String(code)}`))
            }
        })

        child.on('error', (error) => {
            rejectPromise(error)
        })
    })

const main = async () => {
    await fs.access(nxBin)
    const projects = await readProjectNames(domainsRoot)

    if (projects.length === 0) {
        outputStream.write('No domain projects found.\n')
        outputStream.end(() => {
            process.exitCode = 1
        })
        return
    }

    for (const project of projects) {
        await runNxProject(project)
    }

    outputStream.end(() => {
        process.exitCode = 0
    })
}

main().catch((error) => {
    outputStream.write(`Failed to run typecheck: ${String(error)}\n`)
    outputStream.end(() => {
        process.exitCode = 1
    })
})
