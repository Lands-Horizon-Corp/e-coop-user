import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig(() => ({
    root: __dirname,
    cacheDir: '../../../node_modules/.vite/libs/ui/map',
    plugins: [nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
    test: {
        name: 'map',
        watch: false,
        globals: true,
        environment: 'node',
        include: [
            '{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        ],
        reporters: ['default'],
        coverage: {
            reportsDirectory: '../../../coverage/libs/ui/map',
            provider: 'v8' as const,
        },
    },
}))
