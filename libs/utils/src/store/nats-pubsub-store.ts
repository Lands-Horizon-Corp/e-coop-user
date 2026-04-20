// import { WS_URL } from '@/constants'
// // import logger from '@/helpers/loggers/logger'
// // import logger from '@/helpers/loggers/logger'
// import { NatsConnection, connect } from 'nats.ws'
// import { create } from 'zustand'

// export interface INatsConnectOpts {
//     wsUrl?: string
//     user?: string
//     pass?: string
//     onConnect?: () => void
//     onError?: (err: unknown) => void
//     onClosed?: (err?: unknown) => void
// }

// interface INatsState {
//     connection: NatsConnection | null
//     connect: (options?: INatsConnectOpts) => void
//     disconnect: () => void
// }

// export const useNatsStore = create<INatsState>((set, get) => ({
//     connection: null,

//     connect: async ({
//         wsUrl = WS_URL,
//         onConnect,
//         onError,
//         onClosed,
//         ...other
//     } = {}) => {
//         const { connection } = get()
//         if (connection) {
//             // logger.warn('📡: already connected, reusing.')
//             onConnect?.()
//             return
//         }

//         try {
//             const conn = await connect({
//                 servers: wsUrl,
//                 ...other,
//             })
//             set({ connection: conn })

//             conn.closed().then((err) => {
//                 if (err) {
//                     // logger.error(
//                     //     '📡‧‧‧‧‧‧🔥‧‧‧‧‧‧🛰️: connection closed with error:',
//                     //     err
//                     // )
//                     onClosed?.(err)
//                 } else {
//                     // logger.warn('📡😴: connection closed normally')
//                     onClosed?.()
//                 }
//                 set({ connection: null })
//             })
//             // logger.info('📡‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧‧🛰️: Connected')
//         } catch (error) {
//             // logger.error('📡‧‧‧‧‧‧❌‧‧‧‧‧‧‧🛰️: failed to connect:', error)
//             onError?.(error)
//             throw error
//         }
//     },

//     disconnect: async () => {
//         const { connection } = get()
//         if (!connection) {
//             // logger.warn('📡💀: no connection to close.')
//             return
//         }
//         await connection.close()
//         set({ connection: null })
//     },
// }))


import { IS_STAGING, SOKETI_HOST, SOKETI_KEY, SOKETI_PORT } from '@/constants'
import logger from '@/helpers/loggers/logger'
import Pusher, { type Options } from 'pusher-js'
import { create } from 'zustand'

interface PusherState {
    pusher: Pusher | null
    isConnected: boolean
    error: string | null
    initPusher: () => void
    disconnect: () => void
}

const DEFAULT_OPTIONS: Options = {
    wsHost: SOKETI_HOST,
    wsPort: SOKETI_PORT,
    forceTLS: IS_STAGING,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    cluster: 'mt1',
}

export const usePusherStore = create<PusherState>((set, get) => ({
    pusher: null,
    isConnected: false,
    error: null,

    initPusher: () => {
        if (get().pusher) return

        const pusher = new Pusher(SOKETI_KEY, DEFAULT_OPTIONS)

        pusher.connection.bind('connected', () => {
            logger.info('📡🛰️: Soketi connected.')
            set({ isConnected: true, error: null })
        })

        pusher.connection.bind('error', (err: any) => {
            const msg =
                err?.error?.data?.code === 4004
                    ? 'App not found'
                    : 'Connection Refused'
            logger.error('📡❌: Soketi error:', msg)
            set({ error: msg, isConnected: false })
        })

        pusher.connection.bind('disconnected', () => {
            set({ isConnected: false })
        })

        set({ pusher })
    },

    disconnect: () => {
        const { pusher } = get()
        if (pusher) {
            pusher.disconnect()
            set({ pusher: null, isConnected: false })
        }
    },
}))
