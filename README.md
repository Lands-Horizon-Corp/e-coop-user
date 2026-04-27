# 🏢 E-Coop Enterprise Monorepo (v2.0)

Welcome to the E-Coop Enterprise Monorepo. This repository houses the entire E-Coop ecosystem, including our user-facing portals (`downloads`, `admin`, `member`, `core`) and shared libraries.

This project was refactored from a legacy polyrepo structure into a unified **Nx Workspace** to ensure code consistency, eliminate duplication, and provide a lightning-fast developer experience.

---

## 🛠️ Tech Stack

Our 2026 bleeding-edge tech stack is highly optimized for performance and type safety:

- **Package Manager:** [Bun v1.3.9](https://bun.sh/)
- **Monorepo Build System:** [Nx v22](https://nx.dev/)
- **Frontend Core:** React 19 + Vite 7 + TypeScript
- **State & Data:** Zustand (Client State), TanStack Query (Server State), TanStack Router
- **Styling & UI:** Tailwind CSS v4, Base UI (Nova Design System), Radix Primitives
- **Forms & Validation:** React Hook Form + Zod

---

## 🏗️ Architecture: Thin Apps, Thick Libraries

We strictly follow the **Clean Architecture** pattern. Applications do not contain business logic. Instead, logic flows downwards from thin deployments into thick, feature-driven libraries.

````text
e-coop-user/
├── apps/                        # The "Thin" Layer (Deployments)
│   ├── downloads/               # Vite + Router configuration only
│   ├── e-coop-admin/
│   ├── e-coop-member/
│   └── e-coop-core/
├── libs/                        # The "Thick" Layer (Code Warehouse)
│   ├── ui/                      # Base UI Presenters (Dumb components, no state)
│   ├── shared/                  # Global utilities, hooks, and types
│   └── modules/                 # Feature-driven business logic (Entities & Use Cases)
│       └── member-profile/      # Example: Contains specific services, Zod schemas, API logic
└── tools/scripts/               # Internal Developer Platform (Custom automation scripts)

## Getting Started
Prerequisites
To guarantee deterministic builds across all machines and CI environments, this project is strictly locked. DO NOT use npm or yarn.

Node.js: Ensure you are running the Node version specified in the .nvmrc file (Node v20+).

Bun: Install Bun globally.

Windows: powershell -c "irm bun.sh/install.ps1 | iex"

Mac/Linux: curl -fsSL https://bun.sh/install | bash

Installation
Clone the repository and install dependencies using Bun:

Bash
git clone <repository-url>
cd e-coop-user
bun install
Running an App
Start the Vite development server for a specific application:

Bash
bun run dev:downloads    # Starts the downloads portal
bun run dev:admin        # Starts the admin portal
bun run dev:member       # Starts the member portal

Developer Workflow & Commands
We have engineered custom NPM scripts to automate scaffolding, validation, and testing.

1. Unified Validation Pipelines
Before committing, run our all-in-one pipeline commands. These sequentially run the code formatter, ESLint, Vitest, and the Vite build.

bun run dick:all - Formats, lints, tests, and builds ALL projects.

bun run dick:downloads - Runs the pipeline specifically for the downloads app.

bun run validate:all - Prettier check + full typecheck (tsc -b) and Vite build.

2. Scaffolding New Features (Do Not Manually Create Folders!)
To maintain strict Nx wiring and tsconfig.base.json aliases, always use the generators:

Add a new Feature Module:

Bash
bun run g:modules <module-name>
Add a new Shared Library:

Bash
bun run g:shared <lib-name>
3. Custom Automation Tools (IDP)
If you run into import boundary errors or need to validate the monorepo graph, use our custom Node.js scripts located in tools/scripts/:

bun run check:module-imports: Scans the AST to ensure no files are using illegal relative paths, enforcing the use of @e-coop-monorepo/* aliases.

bun run fix:ui-imports: Automatically rewrites broken or legacy UI/utility aliases.

bun run check:modules-types: Runs isolated type-checking for every dynamic module.

Git & Commit Standards
We enforce strict commit message formats to keep our history clean and trigger automated CI/CD workflows properly.

Format your commits as follows:

feat(ticket-number): description of the new feature

fix(ticket-number): description of the bug fix

chore: routine maintenance or dependency updates

Note: Husky is installed (bun run prep) and will block invalid commit messages.




# ECoopMonorepo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/intro#learn-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Finish your remote caching setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/eC9ITY64Mt)

## Run tasks

To run tasks with Nx use:

```sh
npx nx <target> <project-name>
````

For example:

```sh
npx nx build myproject
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

To install a new plugin you can use the `nx add` command. Here's an example of adding the React plugin:

```sh
npx nx add @nx/react
```

Use the plugin's generator to create new projects. For example, to create a new React app or library:

```sh
# Generate an app
npx nx g @nx/react:app demo

# Generate a library
npx nx g @nx/react:lib some-lib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/intro#learn-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
