/// <reference types='vitest' />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import { compression } from 'vite-plugin-compression2';
import UnheadVite from '@unhead/addons/vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import createSitemap from 'vite-plugin-sitemap';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    createSitemap({
      hostname: 'https://ecoop-suite.com',
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^\/assets\/.*\.(js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
          },
        ],
      },
      manifest: {
        name: 'e-coop-suite',
        short_name: 'e-coop',
        theme_color: '#1f2937',
        icons: [
          {
            src: '/e-coop-logo-1.webp',
            sizes: '192x192',
            type: 'image/webp',
            purpose: 'any',
          },
        ],
      },
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
          if (id.includes('react')) return 'react-vendor';
          if (id.includes('@tanstack')) return 'tanstack-vendor';
          if (id.includes('lucide-react') || id.includes('@radix-ui')) return 'ui-vendor';
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },

  test: {
    name: 'e-coop-admin', 
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/e-coop-admin', 
      provider: 'v8',
    },
  },
});