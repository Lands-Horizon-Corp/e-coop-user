import { useMutation, useQuery } from '@tanstack/react-query'

import { Logger } from '@ecoop/shared/loggers'
import API from '@ecoop/shared/providers/core-providers'
import type { HookMutationOptions } from '@ecoop/shared/repositories'
import type { HookQueryOptions } from '@ecoop/shared/repositories'

import type {
    HeartbeatResponse,
    HeartbeatStatusChange,
} from './heartbeat.types'

// Service Functions

export const getHeartbeat = async () => {
    const response = await API.get<HeartbeatResponse>(
        '/api/v1/heartbeat/status'
    )
    return response.data
}

export const sendHeartbeatOnline = async (): Promise<void> => {
    await API.post<void>('/api/v1/heartbeat/online')
}

export const sendHeartbeatOffline = async (): Promise<void> => {
    await API.post<void>('/api/v1/heartbeat/offline')
}

export const sendHeartbeatStatus = async (status: HeartbeatStatusChange) => {
    await API.post<HeartbeatStatusChange>('/api/v1/heartbeat/status', status)
}

// Hooks

export const useGetHeartbeat = ({
    options,
}: {
    options?: HookQueryOptions<HeartbeatResponse, Error>
} = {}) => {
    return useQuery<HeartbeatResponse, Error>({
        ...options,
        queryKey: ['heartbeat', 'status'],
        queryFn: async () => await getHeartbeat(),
    })
}

export const useSendHeartbeatOnline = ({
    options,
}: {
    options?: HookMutationOptions<void, Error, void>
} = {}) => {
    return useMutation<void, Error, void>({
        ...options,
        mutationFn: async () => await sendHeartbeatOnline(),
    })
}

export const useSendHeartbeatOffline = ({
    options,
}: {
    options?: HookMutationOptions<void, Error, void>
} = {}) => {
    return useMutation<void, Error, void>({
        ...options,
        mutationFn: async () => await sendHeartbeatOffline(),
    })
}

export const useSendHeartbeatStatus = ({
    options,
}: {
    options?: HookMutationOptions<void, Error, HeartbeatStatusChange>
} = {}) => {
    return useMutation<void, Error, HeartbeatStatusChange>({
        ...options,
        mutationFn: async (status) => await sendHeartbeatStatus(status),
    })
}

export const logger = Logger.getInstance('heartbeat')
