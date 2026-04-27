import { spawnSync } from 'node:child_process'
import path from 'node:path'

import {
    checkModuleFolder,
    formatIssue,
    getModuleNames,
} from './import-path-checker.mjs'

const rootDir = process.cwd()
const modulesDir = path.join(rootDir, 'libs', 'modules')
const scanRoots = [
    path.join(rootDir, 'apps'),
    path.join(rootDir, 'libs', 'shared'),
    path.join(rootDir, 'libs', 'ui'),
]

const circularFindings = []
const importFindings = []

const aliasFindings = await collectAliasImportFindings()
importFindings.push(...aliasFindings)

const eslintResult = runEslintJson()
if (!eslintResult.ok) {
    importFindings.push({
        filePath: path.join(rootDir, 'eslint.config.mjs'),
        line: null,
        column: null,
        ruleId: 'eslint/runtime',
        message: eslintResult.error,
    })
}

for (const finding of eslintResult.findings) {
    if (isCircularFinding(finding)) {
        circularFindings.push(finding)
        continue
    }

    if (isImportFinding(finding)) {
        importFindings.push(finding)
    }
}

printSummary(circularFindings, importFindings)
printFindings('Circular dependencies', circularFindings)
printFindings('Import errors', importFindings)

const hasFindings = circularFindings.length > 0 || importFindings.length > 0
if (hasFindings) {
    process.exit(1)
}

console.log('\nNo circular dependencies or import errors found.')

async function collectAliasImportFindings() {
    const findings = []
    const moduleNames = await getModuleNames(modulesDir)

    const moduleChecks = await Promise.all(
        moduleNames.map(async (moduleName) => {
            const moduleDir = path.join(modulesDir, moduleName)
            return checkModuleFolder({ moduleDir, moduleNames, modulesDir })
        })
    )

    for (const results of moduleChecks) {
        findings.push(...mapImportPathFindings(results))
    }

    const otherChecks = await Promise.all(
        scanRoots.map((moduleDir) =>
            checkModuleFolder({ moduleDir, moduleNames, modulesDir })
        )
    )

    for (const results of otherChecks) {
        findings.push(...mapImportPathFindings(results))
    }

    return findings
}

function mapImportPathFindings(results) {
    return results.flatMap((result) =>
        result.issues.map((issue) => ({
            filePath: result.filePath,
            line:
                issue.index === undefined || issue.index === null
                    ? null
                    : toLineNumber(result.content, issue.index),
            column: null,
            ruleId: 'custom/import-path',
            message: formatIssue({
                filePath: result.filePath,
                content: result.content,
                issue,
                rootDir,
            }),
        }))
    )
}

function toLineNumber(content, index) {
    return content.slice(0, index).split('\n').length
}

function runEslintJson() {
    const command = process.platform === 'win32' ? 'bunx.cmd' : 'bunx'
    const args = ['eslint', '.', '--format', 'json']
    const result = spawnSync(command, args, {
        cwd: rootDir,
        encoding: 'utf8',
    })

    const stdout = (result.stdout ?? '').trim()
    const stderr = (result.stderr ?? '').trim()

    if (!stdout) {
        return {
            ok: false,
            findings: [],
            error:
                stderr ||
                'ESLint returned no JSON output. Check eslint config and retry.',
        }
    }

    let parsed
    try {
        parsed = JSON.parse(stdout)
    } catch {
        return {
            ok: false,
            findings: [],
            error: `Failed to parse ESLint JSON output.\n${stdout}\n${stderr}`,
        }
    }

    const findings = []
    for (const fileResult of parsed) {
        for (const message of fileResult.messages ?? []) {
            if (message.severity !== 2) {
                continue
            }

            findings.push({
                filePath: fileResult.filePath,
                line: message.line ?? null,
                column: message.column ?? null,
                ruleId: message.ruleId ?? 'unknown',
                message: message.message,
            })
        }
    }

    return { ok: true, findings, error: null }
}

function isCircularFinding(finding) {
    const message = finding.message ?? ''
    return (
        message.includes('Circular dependency between') ||
        finding.ruleId === 'import/no-cycle'
    )
}

function isImportFinding(finding) {
    const message = finding.message ?? ''
    const ruleId = finding.ruleId ?? ''

    if (ruleId === 'custom/import-path') {
        return true
    }

    if (ruleId.startsWith('import/')) {
        return true
    }

    if (ruleId === '@nx/enforce-module-boundaries') {
        return true
    }

    return (
        message.includes('Cannot find module') ||
        message.includes('Unable to resolve path to module')
    )
}

function printFindings(title, findings) {
    console.log(`\n${title}: ${findings.length}`)

    if (findings.length === 0) {
        return
    }

    const sorted = findings
        .slice()
        .sort((a, b) =>
            formatLocation(a).localeCompare(formatLocation(b), 'en-US')
        )

    for (const finding of sorted) {
        const location = formatLocation(finding)
        console.log(
            `- ${location} | ${finding.ruleId} | ${sanitizeMessage(finding.message)}`
        )
    }
}

function formatLocation(finding) {
    const relative = path
        .relative(rootDir, finding.filePath)
        .replace(/\\/g, '/')

    if (!finding.line) {
        return relative
    }

    if (!finding.column) {
        return `${relative}:${finding.line}`
    }

    return `${relative}:${finding.line}:${finding.column}`
}

function sanitizeMessage(message) {
    return String(message).replace(/\s+/g, ' ').trim()
}

function printSummary(circular, imports) {
    const total = circular.length + imports.length
    const scoped = aggregateByProject(circular, imports)

    console.log('\nSummary')
    console.log(`Circular dependencies count: ${circular.length}`)
    console.log(`Import errors count: ${imports.length}`)
    console.log(`Total errors count: ${total}`)

    console.log('\nErrors by project:')
    if (scoped.length === 0) {
        console.log('- none')
        return
    }

    for (const item of scoped) {
        console.log(
            `- ${item.scope} | total=${item.total} circular=${item.circular} import=${item.imports}`
        )
    }
}

function aggregateByProject(circular, imports) {
    const counts = new Map()

    const bump = (finding, type) => {
        const scope = getProjectScope(finding.filePath)
        const current = counts.get(scope) ?? {
            scope,
            total: 0,
            circular: 0,
            imports: 0,
        }

        current.total += 1
        if (type === 'circular') {
            current.circular += 1
        } else {
            current.imports += 1
        }

        counts.set(scope, current)
    }

    for (const finding of circular) {
        bump(finding, 'circular')
    }

    for (const finding of imports) {
        bump(finding, 'import')
    }

    return Array.from(counts.values()).sort((a, b) => {
        if (b.total !== a.total) {
            return b.total - a.total
        }

        return a.scope.localeCompare(b.scope, 'en-US')
    })
}

function getProjectScope(filePath) {
    const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/')
    const segments = relativePath.split('/')

    if (segments[0] === 'apps' && segments[1]) {
        return `./apps/${segments[1]}`
    }

    if (segments[0] === 'libs' && segments[1] === 'modules' && segments[2]) {
        return `./libs/modules/${segments[2]}`
    }

    if (segments[0] === 'libs' && segments[1] === 'shared' && segments[2]) {
        return `./libs/shared/${segments[2]}`
    }

    if (segments[0] === 'libs' && segments[1] === 'ui') {
        return './libs/ui'
    }

    if (segments[0] === 'libs' && segments[1]) {
        return `./libs/${segments[1]}`
    }

    if (segments[0]) {
        return `./${segments[0]}`
    }

    return './unknown'
}
