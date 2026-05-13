import { setEnv } from '@ecoop/shared/constants'

export const setupEnvWeb = () => {
    setEnv({
        APP_ENV: import.meta.env['VITE_APP_ENV'] || 'development',
        APP_VERSION: import.meta.env['VITE_APP_VERSION'] || '0.0.0',
        API_URL:
            import.meta.env['VITE_API_BASE_URL'] || 'http://localhost:8000',
        SOKETI_KEY:
            import.meta.env['VITE_SOKETI_KEY'] ||
            '8KxrqyQiVuoIbVryU8tTPcoJW9RtAVI8Khqrb5rv3Wb8eW8foXGmxwC0jbgEJvGd',
        SOKETI_HOST: import.meta.env['VITE_SOKETI_HOST'] || '127.0.0.1',
        SOKETI_PORT: parseInt(import.meta.env['VITE_SOKETI_PORT'] || '6001'),
        TURNSTILE_CAPTCHA_SITE_KEY:
            import.meta.env['VITE_TURNSTILE_CAPTCHA_SITE_KEY'] || '',
        GOOGLE_MAPS_API_KEY: import.meta.env['VITE_GOOGLE_MAPS_API_KEY'] || '',
        GOOGLE_MAPS_MAP_ID: import.meta.env['VITE_GOOGLE_MAPS_MAP_ID'] || '',
        IS_STAGING: !['development', 'local'].includes(
            import.meta.env['VITE_APP_ENV'] || 'development'
        ),
    })
}
