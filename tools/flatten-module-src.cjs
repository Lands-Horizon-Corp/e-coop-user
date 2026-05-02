#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const argv = require('process').argv.slice(2)
const apply = argv.includes('--apply')

const repoRoot = process.cwd()
const modulesDir = path.join(repoRoot, 'libs', 'modules')

function listModuleDirs() {
    if (!fs.existsSync(modulesDir)) return []

    return fs
        .readdirSync(modulesDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => path.join(modulesDir, entry.name))
}

function removeEntry(entryPath) {
    fs.rmSync(entryPath, { recursive: true, force: true })
}

function moveEntry(fromPath, toPath) {
    fs.renameSync(fromPath, toPath)
}

function flattenModule(moduleDir) {
    const srcDir = path.join(moduleDir, 'src')
    if (!fs.existsSync(srcDir) || !fs.statSync(srcDir).isDirectory()) return []

    const actions = []
    const rootEntries = fs.readdirSync(moduleDir, { withFileTypes: true })

    for (const entry of rootEntries) {
        if (entry.name === 'src') continue

        const entryPath = path.join(moduleDir, entry.name)
        actions.push({ type: 'remove', from: entryPath })
        if (apply) removeEntry(entryPath)
    }

    const srcEntries = fs.readdirSync(srcDir, { withFileTypes: true })
    for (const entry of srcEntries) {
        const fromPath = path.join(srcDir, entry.name)
        const toPath = path.join(moduleDir, entry.name)
        actions.push({ type: 'move', from: fromPath, to: toPath })

        if (!apply) continue
        if (fs.existsSync(toPath)) {
            throw new Error(`Target already exists: ${toPath}`)
        }

        moveEntry(fromPath, toPath)
    }

    if (apply && fs.existsSync(srcDir) && fs.readdirSync(srcDir).length === 0) {
        fs.rmdirSync(srcDir)
        actions.push({ type: 'remove', from: srcDir })
    }

    return actions
}

function run() {
    const moduleDirs = listModuleDirs()
    if (moduleDirs.length === 0) {
        console.log('No module folders found under libs/modules.')
        return
    }

    const plans = []

    for (const moduleDir of moduleDirs) {
        try {
            const actions = flattenModule(moduleDir)
            if (actions.length > 0) {
                plans.push({ moduleDir, actions })
            }
        } catch (err) {
            console.error(
                `Failed to process ${path.relative(repoRoot, moduleDir)}: ${err.message}`
            )
        }
    }

    for (const plan of plans) {
        console.log(`\n${path.relative(repoRoot, plan.moduleDir)}`)
        for (const action of plan.actions) {
            if (action.type === 'move') {
                console.log(
                    ` - move ${path.relative(repoRoot, action.from)} -> ${path.relative(repoRoot, action.to)}`
                )
            } else {
                console.log(` - remove ${path.relative(repoRoot, action.from)}`)
            }
        }
    }

    if (!apply) {
        console.log(
            '\nDry run: no files were changed. Re-run with --apply to perform the cleanup.'
        )
    }
}

run()
