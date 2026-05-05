import { spawn } from 'node:child_process'
import { createWriteStream } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const repoRoot = resolve(__dirname, '..', '..')
const outputPath = resolve(repoRoot, 'typecheck-results.txt')

const outputStream = createWriteStream(outputPath, { flags: 'w' })

const child = spawn('bun', ['nx', 'run-many', '--target=typecheck', '--all'], {
    cwd: repoRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
})

child.stdout.pipe(outputStream)
child.stderr.pipe(outputStream)

child.on('close', (code) => {
    outputStream.end(() => {
        if (typeof code === 'number') {
            process.exitCode = code
        } else {
            process.exitCode = 1
        }
    })
})

child.on('error', (error) => {
    outputStream.write(`Failed to run typecheck: ${String(error)}\n`)
    outputStream.end(() => {
        process.exitCode = 1
    })
})
