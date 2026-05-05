import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const TSCONFIG_PATH = path.join('tsconfig.base.json')
const LIBS_DIR = path.join('libs/domains')

// Load TSConfig and parse paths
const tsconfig = JSON.parse(fs.readFileSync(TSCONFIG_PATH, 'utf8'))
const paths = tsconfig.compilerOptions.paths

// 1. Map all project roots to their aliases based on tsconfig.base.json
const projectRoots = {}
for (const [alias, filePaths] of Object.entries(paths)) {
    // E.g. libs/domains/iam/models/src/index.ts -> libs/domains/iam/models
    const mainFile = filePaths[0]
    const rootDir = mainFile.replace(/\/src\/index\.tsx?$/, '')
    projectRoots[rootDir] = alias
}

// Sort by length descending so we match the deepest/most specific roots first
const sortedRoots = Object.keys(projectRoots).sort(
    (a, b) => b.length - a.length
)

/**
 * Returns the Nx project root and alias for any given absolute file path.
 */
function getProjectInfo(absolutePath) {
    const normalized = path
        .relative(process.cwd(), absolutePath)
        .replace(/\\/g, '/')
    for (const root of sortedRoots) {
        if (normalized.startsWith(root)) {
            return { root, alias: projectRoots[root] }
        }
    }
    return null
}

/**
 * Fixes TS2306: File is not a module.
 * Appends `export {};` if the file has absolutely no exports.
 */
function ensureModule(content) {
    if (!/(?:export\s+[\w{}*]+|export\s+default)/.test(content)) {
        return content + '\nexport {};\n'
    }
    return content
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8')
    const originalContent = content

    const currentProject = getProjectInfo(filePath)

    if (currentProject) {
        // Regex to capture standard and dynamic imports
        const importRegex =
            /((?:import|export)\s+(?:type\s+)?[^'"]*from\s+['"])([^'"]+)(['"])|(import\s*\(\s*['"])([^'"]+)(['"])/g

        content = content.replace(
            importRegex,
            (match, p1, p2, p3, p4, p5, p6) => {
                const pre = p1 || p4
                const importPath = p2 || p5
                const post = p3 || p6

                // Rule 1: Relative imports crossing project boundaries -> Absolute Alias
                if (importPath.startsWith('.')) {
                    // Resolve relative import to absolute file path
                    const absoluteImportPath = path.resolve(
                        path.dirname(filePath),
                        importPath
                    )
                    const importedProject = getProjectInfo(absoluteImportPath)

                    // If importing from a DIFFERENT nx project, use the tsconfig alias reference
                    if (
                        importedProject &&
                        importedProject.alias !== currentProject.alias
                    ) {
                        return `${pre}${importedProject.alias}${post}`
                    }
                }
                // Rule 2: Absolute Alias imports pointing to its OWN project -> Relative Path
                else if (importPath.startsWith('@ecoop/')) {
                    // Check if the alias belongs to the current file's project
                    if (
                        importPath === currentProject.alias ||
                        importPath.startsWith(currentProject.alias + '/')
                    ) {
                        const remainder = importPath.substring(
                            currentProject.alias.length
                        )

                        // Base points to the src directory where the alias index is
                        const targetAbsolute = remainder
                            ? path.join(
                                  process.cwd(),
                                  currentProject.root,
                                  'src',
                                  remainder
                              )
                            : path.join(
                                  process.cwd(),
                                  currentProject.root,
                                  'src',
                                  'index.ts'
                              )

                        let relPath = path
                            .relative(path.dirname(filePath), targetAbsolute)
                            .replace(/\\/g, '/')
                        relPath = relPath.replace(/\.tsx?$/, '')

                        if (!relPath.startsWith('.')) {
                            relPath = './' + relPath
                        }
                        if (relPath.endsWith('/index')) {
                            relPath =
                                relPath.substring(0, relPath.length - 6) || '.'
                        }

                        return `${pre}${relPath}${post}`
                    }
                }
                return match
            }
        )
    }

    // Rule 3: Direct typo fixes from typecheck-results-domains.txt
    const typoReplacements = [
        // Extensions fixes
        { rx: /(from\s+['"][^'"]+)\.constant(['"])/g, rep: '$1.constants$2' },
        { rx: /(from\s+['"][^'"]+)\.enums(['"])/g, rep: '$1.enum$2' },
        {
            rx: /(from\s+['"][^'"]+)\-validation(['"])/g,
            rep: '$1.validation$2',
        },

        // Broken platform internal relative imports from log (temporarily alias to allow Rule 2 to auto-relativize them)
        {
            rx: /(from\s+['"])\.\.\/area(['"])/g,
            rep: '$1@ecoop/platforms/area$2',
        },
        {
            rx: /(from\s+['"])\.\.\/category(['"])/g,
            rep: '$1@ecoop/platforms/category$2',
        },
        {
            rx: /(from\s+['"])\.\.\/currency(['"])/g,
            rep: '$1@ecoop/platforms/currency$2',
        },
        {
            rx: /(from\s+['"])\.\.\/tag-template(['"])/g,
            rep: '$1@ecoop/platforms/tag-template$2',
        },

        // Named export fixes
        { rx: /LOAN_MODE_OF_PAYMENT/g, rep: 'TLoanModeOfPayment' },
        { rx: /WEEKDAYS/g, rep: 'TWeekdays' },
        {
            rx: /getCrudPermissions,\s*hasPermission/g,
            rep: 'getCrudPermissions, getAllPermissions as hasPermission',
        },
        {
            rx: /hasPermission(\s*\}?\s*from\s+['"]@ecoop\/domains\/iam\/modules\/permission['"])/g,
            rep: 'getAllPermissions as hasPermission$1',
        },

        // Implicit Any in validation parameters (TS7006)
        { rx: /\(\s*val\s*\)\s*=>/g, rep: '(val: any) =>' },
    ]

    for (const { rx, rep } of typoReplacements) {
        content = content.replace(rx, rep)
    }

    // Ensure empty/type-only validation files have an export statement (fixes TS2306)
    if (filePath.endsWith('.ts')) {
        content = ensureModule(content)
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8')
        console.log(`Updated imports in: ${filePath}`)
    }
}

function traverseDirectory(dir) {
    if (!fs.existsSync(dir)) return
    const files = fs.readdirSync(dir)

    for (const file of files) {
        const fullPath = path.join(dir, file)
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
            if (!['node_modules', 'dist', 'tmp'].includes(file)) {
                traverseDirectory(fullPath)
            }
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            processFile(fullPath)
        }
    }
}

console.log('Starting cross-project boundary import fixes...')
traverseDirectory(LIBS_DIR)
console.log('Done resolving project domains and fixing schemas.')
