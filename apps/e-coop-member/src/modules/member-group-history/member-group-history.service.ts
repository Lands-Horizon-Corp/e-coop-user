import { useQuery } from '@tanstack/react-query'
import qs from 'query-string'

import { Logger } from '@ecoop/shared/loggers'
import type { HookQueryOptions } from '@ecoop/shared/repositories'
import { createDataLayerFactory } from '@ecoop/shared/repositories'
import type { TAPIQueryOptions, TEntityId } from '@ecoop/shared/types'

import type {
    IMemberGroupHistory,
    IMemberGroupHistoryPaginated,
} from './member-group-history.types'

const { apiCrudHooks, apiCrudService } = createDataLayerFactory<
    IMemberGroupHistory,
    void
>({
    url: '/api/v1/member-group-history',
    baseKey: 'member-group-history',
})

// ⚙️🛠️ API SERVICE HERE
export const MemberGroupHistoryAPI = apiCrudService

// Custom API for fetching Member Group History by Profile ID
export const getMemberGroupHistoryById = async ({
    profileId,
    query,
}: {
    profileId: TEntityId
    query?: {
        sort?: string
        filters?: string
        pageIndex?: number
        pageSize?: number
    }
}) => {
    const url = qs.stringifyUrl(
        {
            url: `${MemberGroupHistoryAPI.route}/member-profile/${profileId}/search`,
            query,
        },
        { skipNull: true }
    )

    const response =
        await MemberGroupHistoryAPI.API.get<IMemberGroupHistoryPaginated>(url)
    return response.data
}

// 🪝 HOOK STARTS HERE
export const {
    useCreate,
    useDeleteById,
    useDeleteMany,
    useGetAll,
    useGetById,
    useGetPaginated,
    useUpdateById,
} = apiCrudHooks

// 🪝 Custom Hook for Fetching Member Group History
export const useMemberGroupHistory = ({
    profileId,
    query,
    options,
}: {
    profileId: TEntityId
    query?: TAPIQueryOptions
    options?: HookQueryOptions<IMemberGroupHistoryPaginated, Error>
}) => {
    return useQuery<IMemberGroupHistoryPaginated, Error>({
        ...options,
        queryKey: [
            'member-group-history',
            'member-profile',
            profileId,
            'paginated',
            query,
        ],
        queryFn: () => getMemberGroupHistoryById({ profileId, query }),
    })
}

export const logger = Logger.getInstance('member-group-history')
