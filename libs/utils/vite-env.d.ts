/// <reference types="vite/client" />

interface ImportMetaEnv {
    // App Basics
    readonly VITE_APP_ENV: string
    readonly VITE_APP_VERSION: string
    readonly VITE_API_BASE_URL: string

    // Websockets / NATS
    readonly VITE_WS_URL: string
    readonly VITE_WS_CLIENT: string
    readonly VITE_WS_USER: string
    readonly VITE_WS_PASSWORD: string

    // Soketi 
    readonly VITE_SOKETI_KEY: string
    readonly VITE_SOKETI_HOST: string
    readonly VITE_SOKETI_PORT: string
    readonly VITE_SOKETI_CLIENT: string

    // Turnstile
    readonly VITE_TURNSTILE_CAPTCHA_SITE_KEY: string

    // Google
    readonly VITE_GOOGLE_MAPS_API_KEY: string
    readonly VITE_GOOGLE_MAPS_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}