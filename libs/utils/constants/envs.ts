// App Environment
export const APP_ENV = import.meta.env.VITE_APP_ENV || 'development'

export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '0.0.0'

// API / BACKEND SERVER
export const API_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

// WS
export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8080'
export const SOKETI_KEY =
    import.meta.env.VITE_SOKETI_KEY ||
    '8KxrqyQiVuoIbVryU8tTPcoJW9RtAVI8Khqrb5rv3Wb8eW8foXGmxwC0jbgEJvGd'
export const SOKETI_HOST = import.meta.env.VITE_SOKETI_HOST || '127.0.0.1'
export const SOKETI_PORT = parseInt(import.meta.env.VITE_SOKETI_PORT || '6001')

// NATS
export const NATS_CLIENT = import.meta.env.VITE_WS_CLIENT || ''

export const NATS_USER = import.meta.env.VITE_WS_USER || ''

export const NATS_PASS = import.meta.env.VITE_WS_PASSWORD || ''

export const ORGANIZATION_ID = import.meta.env["VITE_ORGANIZATION_ID"] || ''

export const SPOOFING_SERVER_URL =
    import.meta.env["VITE_SPOOFING_SERVER_URL"] || 'http://localhost:8001'

// TURNSTILE CAPTCHA
export const TURNSTILE_CAPTCHA_SITE_KEY =
    import.meta.env.VITE_TURNSTILE_CAPTCHA_SITE_KEY || ''

// GOOGLE
export const GOOGLE_MAPS_API_KEY =
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''

export const GOOGLE_MAPS_MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_ID || ''

export const IS_STAGING = !['development', 'local'].includes(APP_ENV)
