import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig(() => ({
    root: __dirname,
    cacheDir:
        '../../../../../node_modules/.vite/libs/domains/rates-computations/modules/grocery-computation-sheet-monthly',
    plugins: [nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
    test: {
        name: 'rates-computations-grocery-computation-sheet-monthly',
        watch: false,
        globals: true,
        environment: 'node',
        include: [
            '{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        ],
        reporters: ['default'],
        coverage: {
            reportsDirectory:
                '../../../../../coverage/libs/domains/rates-computations/modules/grocery-computation-sheet-monthly',
            provider: 'v8' as const,
        },
    },
}))
