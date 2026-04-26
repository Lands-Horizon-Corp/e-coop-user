import path from "node:path";
import {
  checkModuleFolder,
  fixModuleFolder,
  formatIssue,
  getModuleNames,
} from "./import-path-checker.mjs";

const rootDir = process.cwd();
const modulesDir = path.join(rootDir, "libs", "modules");
const moduleNames = await getModuleNames(modulesDir);

const args = process.argv.slice(2);
const fix = args.includes("--fix");
const targetModule = args.find((arg) => arg !== "--fix");
if (!targetModule) {
  console.error("Usage: bun tools/scripts/check-module-imports.mjs <module-name> [--fix]");
  process.exit(1);
}

if (!moduleNames.includes(targetModule)) {
  console.error(`Unknown module: ${targetModule}`);
  process.exit(1);
}

const moduleDir = path.join(modulesDir, targetModule);
const results = fix
  ? await fixModuleFolder({ moduleDir, moduleNames, modulesDir })
  : await checkModuleFolder({ moduleDir, moduleNames, modulesDir });

let totalIssues = 0;
let totalFixedFiles = 0;
for (const result of results) {
  for (const issue of result.issues) {
    totalIssues += 1;
    console.log(
      formatIssue({
        filePath: result.filePath,
        content: result.content,
        issue,
        rootDir,
      }),
    );
  }

  if (fix && result.updated) {
    totalFixedFiles += 1;
  }
}

if (totalIssues > 0) {
  const suffix = fix ? "Fixed" : "Found";
  console.error(`\n${suffix} ${totalIssues} invalid module import(s).`);
  if (!fix) {
    process.exit(1);
  }
  if (totalFixedFiles > 0) {
    console.log(`Updated ${totalFixedFiles} file(s).`);
  }
  process.exit(0);
}

console.log("No invalid module imports found.");
