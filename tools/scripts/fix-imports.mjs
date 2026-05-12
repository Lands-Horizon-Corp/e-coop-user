import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Navigate up two directories from 'tools/scripts' to reach the monorepo root
const ROOT_DIR = path.resolve(__dirname, '../../')
const DOMAINS_DIR = path.join(ROOT_DIR, 'libs', 'domains')

// Regex to capture import/export statements pointing to our target file types.
// Group 1: The import/export syntax (e.g., "import { X } from " or "export * from ")
// Group 2: The opening quote (' or ")
// Group 3: The actual path string (e.g., "../../models/user.types" or "./constants")
// Group 4: The closing quote (' or ")
const IMPORT_REGEX =
    /((?:import|export)\s+(?:[^'"]+\s+from\s+)?)(['"])([^'"]*(?:\.types|\.constants|\.validation)(?:\.[jt]sx?)?)(['"])/g

/**
 * Recursively fetches all files within a directory.
 * @param {string} dirPath - The directory to walk.
 * @param {string[]} arrayOfFiles - Accumulator for file paths.
 * @returns {Promise<string[]>} Array of absolute file paths.
 */
async function walkDirectory(dirPath, arrayOfFiles = []) {
    try {
        const files = await fs.readdir(dirPath, { withFileTypes: true })

        for (const file of files) {
            const fullPath = path.join(dirPath, file.name)
            if (file.isDirectory()) {
                arrayOfFiles = await walkDirectory(fullPath, arrayOfFiles)
            } else {
                arrayOfFiles.push(fullPath)
            }
        }
    } catch (error) {
        // Fails silently if a directory doesn't exist (e.g., missing 'modules' folder)
        if (error.code !== 'ENOENT') {
            console.error(`Error reading directory ${dirPath}:`, error)
        }
    }
    return arrayOfFiles
}

/**
 * Reads a file, applies the regex replacement, and saves if modified.
 * @param {string} filePath - Path to the file.
 * @param {string} domainName - The current domain name for the alias.
 * @returns {Promise<boolean>} True if the file was modified, false otherwise.
 */
async function processFile(filePath, domainName) {
    // Only process TypeScript and JavaScript files
    if (!/\.(ts|tsx|js|jsx)$/.test(filePath)) return false

    const isIndexFile =
        path.basename(filePath) === 'index.ts' ||
        path.basename(filePath) === 'index.js'

    try {
        const originalContent = await fs.readFile(filePath, 'utf-8')

        // Replace the specific imports
        const updatedContent = originalContent.replace(
            IMPORT_REGEX,
            (match, prefix, openQuote, importPath, closeQuote) => {
                // Check if it's an internal domain import (either relative or using the current domain's alias)
                const isRelative = importPath.startsWith('.')
                const isCurrentDomainAlias = importPath.startsWith(
                    `@ecoop/${domainName}/`
                )

                if (isRelative || isCurrentDomainAlias) {
                    if (isIndexFile) {
                        // Comment out the entire import/export statement in index files
                        return `// ${match}`
                    }
                    // Transform to the root models alias
                    return `${prefix}${openQuote}@ecoop/${domainName}/models${closeQuote}`
                }

                // If it's pointing to a completely different domain, leave it alone
                return match
            }
        )

        if (originalContent !== updatedContent) {
            await fs.writeFile(filePath, updatedContent, 'utf-8')
            console.log(
                `✅ Fixed imports in: ${path.relative(ROOT_DIR, filePath)}`
            )
            return true
        }
    } catch (error) {
        console.error(`Failed to process file ${filePath}:`, error)
    }

    return false
}

/**
 * Main execution function. Iterates through domains and their modules.
 */
async function main() {
    console.log(`🔍 Scanning for imports in ${DOMAINS_DIR}...\n`)
    let totalFixedFiles = 0

    try {
        const domains = await fs.readdir(DOMAINS_DIR, { withFileTypes: true })

        for (const domain of domains) {
            if (!domain.isDirectory()) continue

            const domainName = domain.name
            const modulesDirPath = path.join(DOMAINS_DIR, domainName, 'modules')

            // Check if the modules directory exists inside this domain
            try {
                const modules = await fs.readdir(modulesDirPath, {
                    withFileTypes: true,
                })

                for (const mod of modules) {
                    if (!mod.isDirectory()) continue

                    const modulePath = path.join(modulesDirPath, mod.name)
                    const files = await walkDirectory(modulePath)

                    for (const file of files) {
                        const wasFixed = await processFile(file, domainName)
                        if (wasFixed) totalFixedFiles++
                    }
                }
            } catch (err) {
                // Ignore if the domain doesn't have a 'modules' folder yet
                if (err.code !== 'ENOENT') {
                    console.error(
                        `Error processing modules for domain ${domainName}:`,
                        err
                    )
                }
            }
        }

        console.log(`\n🎉 Finished! Fixed imports in ${totalFixedFiles} files.`)
    } catch (error) {
        console.error(
            'Failed to read domains directory. Make sure you are running this from the monorepo root.',
            error
        )
    }
}

// Run the script
main()
