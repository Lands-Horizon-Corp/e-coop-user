import {
    env.IS_STAGING,
    env.SOKETI_HOST,
    env.SOKETI_KEY,
    env.SOKETI_PORT,
} from '@ecoop/shared/constants'
import { Logger } from '@ecoop/shared/loggers'
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
    wsHost: env.SOKETI_HOST,
    wsPort: env.SOKETI_PORT,
    forceTLS: env.IS_STAGING,
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

        const pusher = new Pusher(env.SOKETI_KEY, DEFAULT_OPTIONS)

        const logger = Logger.getInstance('pusher', false)

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
