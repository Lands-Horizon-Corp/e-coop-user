/// <reference types='vitest' />
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
// import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import UnheadVite from '@unhead/addons/vite'
import react from '@vitejs/plugin-react'
import { dirname, join } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath } from 'url'
import { compression } from 'vite-plugin-compression2'
import { defineConfig } from 'vitest/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
    base: '/',
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/downloads',
    publicDir: '../../public',

    server: {
        port: 3003,
        host: 'localhost',
    },

    preview: {
        port: 3003,
        host: 'localhost',
    },

    resolve: {
        alias: {
            stream: 'stream-browserify',
            crypto: 'crypto-browserify',
            '@': join(__dirname, 'src'),
        },
    },

    plugins: [
        UnheadVite(),
        tanstackRouter({ target: 'react', autoCodeSplitting: true }),
        react(),
        nxViteTsPaths(),
        nxCopyAssetsPlugin(['*.md']),
        // tailwindcss(),
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
})
