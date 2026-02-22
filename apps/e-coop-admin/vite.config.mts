/// <reference types='vitest' />
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import UnheadVite from '@unhead/addons/vite'
import react from '@vitejs/plugin-react'
import { dirname } from 'path'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath } from 'url'
import { compression } from 'vite-plugin-compression2'
import { VitePWA } from 'vite-plugin-pwa'
import createSitemap from 'vite-plugin-sitemap'
import { defineConfig } from 'vitest/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/e-coop-admin',
    publicDir: '../../public',

    server: {
        port: 3001,
        host: 'localhost',
    },

    preview: {
        port: 3001,
        host: 'localhost',
    },

    resolve: {
        alias: {
            stream: 'stream-browserify',
            crypto: 'crypto-browserify',
        },
    },

    plugins: [
        UnheadVite(),
        tanstackRouter({ target: 'react', autoCodeSplitting: true }),
        react(),
        nxViteTsPaths(),
        nxCopyAssetsPlugin(['*.md']),
        tailwindcss(),
        compression(),
        visualizer({
            filename: 'bundle-analysis.html',
            template: 'treemap',
            open: false,
            gzipSize: true,
            brotliSize: true,
        }),
        NodeGlobalsPolyfillPlugin({
            buffer: true,
            process: true,
        }),
    ],

    build: {
        outDir: '../../dist/apps/e-coop-admin',
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        rollupOptions: {
            plugins: [rollupNodePolyFill() as any],
            output: {
                manualChunks(id) {
                    if (id.includes('react')) return 'react-vendor'
                    if (id.includes('@tanstack')) return 'tanstack-vendor'
                    if (id.includes('lucide-react') || id.includes('@radix-ui'))
                        return 'ui-vendor'
                    if (id.includes('node_modules')) return 'vendor'
                },
            },
        },
    },

    test: {
        name: 'e-coop-admin',
        watch: false,
        globals: true,
        environment: 'jsdom',
        include: [
            '{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
        ],
        reporters: ['default'],
        coverage: {
            reportsDirectory: '../../coverage/apps/e-coop-admin',
            provider: 'v8',
        },
    },
})
