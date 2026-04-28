#!/usr/bin/env node

import { spawnSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import path from 'node:path'

const workspaceRoot = process.cwd()
const outputFile = path.join(workspaceRoot, 'circular-lint-results.txt')

function runLintAndFilter() {
    const args = ['nx', 'run-many', '--target=lint']

    const result = spawnSync('npx', args, {
        cwd: workspaceRoot,
        encoding: 'utf-8',
        shell: process.platform === 'win32',
        maxBuffer: 1024 * 1024 * 50,
    })

    const combinedOutput = `${result.stdout || ''}\n${result.stderr || ''}`
    const allLines = combinedOutput.split('\n')
    const filteredLines = []

    let linesToKeep = 0

    for (const line of allLines) {
        if (line.toLowerCase().includes('circular')) {
            linesToKeep = 6
        }

        if (linesToKeep > 0) {
            filteredLines.push(line)
            linesToKeep--
        }
    }

    writeFileSync(outputFile, filteredLines.join('\n'), 'utf8')

    if (result.status !== 0 && filteredLines.length === 0) {
        process.exit(result.status ?? 1)
    }
}

runLintAndFilter()

console.log(`Results saved to: ${outputFile}`)
