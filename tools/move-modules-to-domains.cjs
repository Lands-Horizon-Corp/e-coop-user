#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const argv = require('process').argv.slice(2)
const args = {}
argv.forEach((a) => {
    if (a === '--apply') args.apply = true
    else if (a === '--dry') args.dry = true
    else if (a.startsWith('--pattern=')) args.pattern = a.split('=')[1]
    else if (a.startsWith('--to=')) args.to = a.split('=')[1]
})

const repoRoot = process.cwd()
const modulesDir = path.join(repoRoot, 'libs', 'modules')
const domainsDir = path.join(repoRoot, 'libs', 'domains')

const mapping = {
    iam: [
        'user',
        'user-organization',
        'user-profile',
        'user-rating',
        'authentication',
        'permission',
        'permission-template',
        'organization',
        'organization-category',
        'organization-media',
        'orgnaization-daily-usage',
        'branch',
        'branch-settings',
        'company',
        'employee',
        'invitation-code',
        'subscription-plan',
        'member-user-account',
    ],
    'member-crm': [
        'member-profile',
        'member-profile-archive',
        'member-profile-media',
        'member-address',
        'member-asset',
        'member-bank-card',
        'member-center',
        'member-center-history',
        'member-classification',
        'member-classification-history',
        'member-close-remark',
        'member-contact-reference',
        'member-department',
        'member-department-history',
        'member-description-schema',
        'member-educational-attainment',
        'member-expense',
        'member-gender',
        'member-gender-history',
        'member-government-benefit',
        'member-group',
        'member-group-history',
        'member-income',
        'member-joint-account',
        'member-occupation',
        'member-occupation-history',
        'member-other-information-entry',
        'member-recruits',
        'member-relative-account',
        'member-type',
        'member-type-history',
        'member-verification',
        'comaker-member-profile',
    ],
    accounting: [
        'account',
        'account-category',
        'account-classification',
        'account-history',
        'account-tag',
        'account-transaction',
        'account-transaction-entry',
        'general-ledger',
        'general-ledger-account-grouping',
        'general-ledger-definition',
        'general-account-grouping-net-surplus-negative',
        'general-account-grouping-net-surplus-positive',
        'general-accounting-ledger-tag',
        'gl-fs',
        'financial-statement-account-grouping',
        'financial-statement-definition',
        'financial-statement-title',
        'journal-voucher',
        'journal-voucher-entry',
        'journal-voucher-tag',
        'unbalance-account',
        'member-accounting-ledger',
        'member-account-ledger',
        'include-negative-accounts',
    ],
    loans: [
        'loan-account',
        'loan-amortization-schedule',
        'loan-clearance-analysis',
        'loan-clearance-analysis-institution',
        'loan-guaranteed-fund',
        'loan-guaranteed-fund-per-month',
        'loan-guide',
        'loan-ledger',
        'loan-payment',
        'loan-purpose',
        'loan-status',
        'loan-tag',
        'loan-terms-and-condition-amount-receipt',
        'loan-terms-and-condition-suggested-payment',
        'loan-transaction',
        'loan-transaction-entry',
        'automatic-loan-deduction',
        'collateral',
        'comaker-collateral',
    ],
    transactions: [
        'transaction',
        'transactions',
        'transaction-batch',
        'transaction-tag',
        'quick-transfer',
        'cash-check-voucher',
        'cash-check-voucher-entry',
        'cash-check-voucher-tag',
        'cancelled-cash-check-voucher',
        'cash-count',
        'check-remittance',
        'online-remittance',
        'adjustment-entry',
        'adjustment-entry-tag',
        'batch-funding',
        'disbursement',
        'disbursement-transaction',
        'collectors-member-account-entry',
        'payment-type',
        'post-dated-check',
        'voucher-pay-to',
        'bill-and-coins',
        'or-builder',
    ],
    'savings-investments': [
        'mutual-fund',
        'mutual-fund-additional-members',
        'mutual-fund-entry',
        'mutual-fund-table',
        'time-deposit-computation',
        'time-deposit-computation-pre-mature',
        'time-deposit-type',
        'generated-savings-interest',
        'generated-savings-interest-entry',
        'member-mutual-fund-history',
        'member-damayan-extension-entry',
        'member-deduction-entry',
        'funds',
    ],
    'rates-computations': [
        'browse-reference',
        'browse-exclude-include-accounts',
        'calculator',
        'computation-sheet',
        'computation-type',
        'grocery-computation-sheet',
        'grocery-computation-sheet-monthly',
        'charges-rate-by-range-or-minimum-amount',
        'charges-rate-by-term',
        'charges-rate-scheme',
        'charges-rate-scheme-account',
        'charges-rate-scheme-mode-of-payment',
        'interest-maturity',
        'interest-rate-by-amount',
        'interest-rate-by-date',
        'interest-rate-by-term',
        'interest-rate-by-terms-header',
        'interest-rate-by-year',
        'interest-rate-percentage',
        'interest-rate-scheme',
        'fines-maturity',
        'member-classification-interest-rate',
    ],
    reporting: ['generated-report', 'generated-reports-download-users'],
    analytics: ['dashboard'],
    'social-media': ['feed', 'feed-comment', 'feed-like', 'feed-media'],
    communications: ['notification', 'contact-us', 'feedback'],
}

function findExistingModules() {
    if (!fs.existsSync(modulesDir)) return []
    return fs
        .readdirSync(modulesDir)
        .filter((f) => fs.statSync(path.join(modulesDir, f)).isDirectory())
}

function planMoves() {
    const existing = findExistingModules()
    const moves = []

    for (const [domain, modules] of Object.entries(mapping)) {
        for (const m of modules) {
            const src = path.join(modulesDir, m)
            if (fs.existsSync(src)) {
                const destDir = path.join(domainsDir, domain)
                const dest = path.join(destDir, m)
                moves.push({ module: m, src, dest, domain })
            }
        }
    }

    if (args.pattern && args.to) {
        const regex = new RegExp(args.pattern)
        for (const m of existing) {
            if (regex.test(m)) {
                const src = path.join(modulesDir, m)
                const destDir = path.join(domainsDir, args.to)
                const dest = path.join(destDir, m)
                if (!moves.find((x) => x.module === m))
                    moves.push({ module: m, src, dest, domain: args.to })
            }
        }
    }

    return moves.filter(
        (v, i, a) => a.findIndex((x) => x.module === v.module) === i
    )
}

function run() {
    const moves = planMoves()
    if (moves.length === 0) {
        console.log(
            'No planned moves found. Ensure `libs/modules` contains module directories or provide a `--pattern` and `--to` mapping.'
        )
        return
    }

    console.log('\nPlanned moves:')
    moves.forEach((m) =>
        console.log(
            ` - ${path.relative(repoRoot, m.src)} -> ${path.relative(repoRoot, m.dest)} (domain: ${m.domain})`
        )
    )

    if (!args.apply) {
        console.log(
            '\nDry run: no files were moved. Re-run with `--apply` to perform moves. Example:'
        )
        console.log('  node tools/move-modules-to-domains.cjs --apply')
        console.log('Or use a pattern:')
        console.log(
            '  node tools/move-modules-to-domains.cjs --pattern="^member-" --to=member-crm --apply'
        )
        return
    }

    for (const m of moves) {
        try {
            if (!fs.existsSync(m.src)) {
                console.warn(`Source missing, skipping: ${m.src}`)
                continue
            }
            if (!fs.existsSync(path.dirname(m.dest))) {
                fs.mkdirSync(path.dirname(m.dest), { recursive: true })
            }

            fs.cpSync(m.src, m.dest, { recursive: true })
            fs.rmSync(m.src, { recursive: true, force: true })

            console.log(
                `Moved: ${path.relative(repoRoot, m.src)} -> ${path.relative(repoRoot, m.dest)}`
            )
        } catch (err) {
            console.error(`Failed to move ${m.module}:`, err.message)
        }
    }
}

run()
