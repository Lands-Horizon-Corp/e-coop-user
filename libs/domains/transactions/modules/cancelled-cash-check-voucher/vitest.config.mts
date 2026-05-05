import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig(() => ({
    root: __dirname,
    cacheDir:
        '../../../../../node_modules/.vite/libs/domains/transactions/modules/cancelled-cash-check-voucher',
    plugins: [nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
    test: {
        name: 'transactions-cancelled-cash-check-voucher',
        watch: false,
        globals: true,
        environment: 'node',
        include: [
            '{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        ],
        reporters: ['default'],
        coverage: {
            reportsDirectory:
                '../../../../../coverage/libs/domains/transactions/modules/cancelled-cash-check-voucher',
            provider: 'v8' as const,
        },
    },
}))
