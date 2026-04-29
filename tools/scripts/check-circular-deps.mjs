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
    let totalCircularIssues = 0
    const fileFrequency = {}
    const fileRegex = /[a-zA-Z0-9./_-]+\.(?:ts|tsx|js|jsx)/g

    for (const line of allLines) {
        if (line.toLowerCase().includes('circular')) {
            totalCircularIssues++
            linesToKeep = 6
        }

        if (linesToKeep > 0) {
            filteredLines.push(line)
            linesToKeep--

            const matches = line.match(fileRegex)
            if (matches) {
                for (const match of matches) {
                    fileFrequency[match] = (fileFrequency[match] || 0) + 1
                }
            }
        }
    }

    const sortedFiles = Object.entries(fileFrequency).sort(
        (a, b) => b[1] - a[1]
    )

    const summary = [
        '',
        '==================================================',
        'STATISTICAL SUMMARY',
        '==================================================',
        `Total circular dependency mentions: ${totalCircularIssues}`,
        `Unique files involved: ${sortedFiles.length}`,
        '',
        'Top Choke Point Files (Most frequent in circular paths):',
    ]

    for (const [file, count] of sortedFiles.slice(0, 50)) {
        summary.push(`[${count} occurrences] ${file}`)
    }

    if (sortedFiles.length === 0) {
        summary.push('No file paths detected in the output.')
    }

    summary.push('==================================================')

    const finalOutput = filteredLines.join('\n') + '\n' + summary.join('\n')
    writeFileSync(outputFile, finalOutput, 'utf8')

    if (result.status !== 0 && filteredLines.length === 0) {
        process.exit(result.status ?? 1)
    }
}

runLintAndFilter()

console.log(`Results saved to: ${outputFile}`)
