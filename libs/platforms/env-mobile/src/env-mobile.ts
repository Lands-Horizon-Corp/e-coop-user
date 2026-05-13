import { setEnv } from '@ecoop/shared/constants'

export const setupEnvMobile = () => {
    setEnv({
        APP_ENV: process.env['LYNX_APP_ENV'] || 'development',
        APP_VERSION: process.env['LYNX_APP_VERSION'] || '0.0.0',
        API_BASE_URL:
            process.env['LYNX_API_BASE_URL'] || 'http://localhost:8000',
        SOKETI_KEY:
            process.env['LYNX_SOKETI_KEY'] ||
            '8KxrqyQiVuoIbVryU8tTPcoJW9RtAVI8Khqrb5rv3Wb8eW8foXGmxwC0jbgEJvGd',
        SOKETI_HOST: process.env['LYNX_SOKETI_HOST'] || '127.0.0.1',
        SOKETI_PORT: parseInt(process.env['LYNX_SOKETI_PORT'] || '6001'),
        TURNSTILE_CAPTCHA_SITE_KEY:
            process.env['LYNX_TURNSTILE_CAPTCHA_SITE_KEY'] || '',
        GOOGLE_MAPS_API_KEY: process.env['LYNX_GOOGLE_MAPS_API_KEY'] || '',
        GOOGLE_MAPS_MAP_ID: process.env['LYNX_GOOGLE_MAPS_MAP_ID'] || '',
        IS_STAGING: !['development', 'local'].includes(
            process.env['LYNX_APP_ENV'] || 'development'
        ),
    })
}
