import nx from '@nx/eslint-plugin';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import perfectionist from 'eslint-plugin-perfectionist';
// 👇 Added this back for nice autocomplete
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // 1. NX Default Configs (These REPLACE 'js' and 'tseslint' imports)
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],

  // 2. Global Ignores
  {
    ignores: [
      '**/dist',
      '**/out-tsc',
      '**/amplify',
      '**/vitest.config.*.timestamp*',
      '**/vite.config.*.timestamp*',
      ".nx/**/*",
    ],
  },

  // 3. NX Module Boundaries
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },

  // 4. YOUR OLD SYSTEM RULES
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'perfectionist': perfectionist,
    },
    rules: {
      // React Hooks
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'off',
        { allowConstantExport: true },
      ],

      // Perfectionist (Sorting)
      'perfectionist/sort-jsx-props': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          ignoreCase: true,
        },
      ],

      // TypeScript / General
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': [
        'warn',
        { allowInterfaces: 'with-single-extends' },
      ],
    },
  },
]);