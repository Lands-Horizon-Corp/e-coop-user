import { useQuery } from '@tanstack/react-query'
import qs from 'query-string'

import { Logger } from '@e-coop-monorepo/shared/helpers'
import type {
    HookQueryOptions} from '@e-coop-monorepo/shared/providers';
import {
    createDataLayerFactory,
} from '@e-coop-monorepo/shared/providers'
import type { TAPIQueryOptions, TEntityId } from '@e-coop-monorepo/shared/types'

import type {
    IMemberGenderHistory,
    IMemberGenderHistoryPaginated,
} from './member-gender-history.types'

const { apiCrudHooks, apiCrudService } = createDataLayerFactory<
    IMemberGenderHistory,
    void
>({
    url: '/api/v1/member-gender-history',
    baseKey: 'member-gender-history',
})

// ⚙️🛠️ API SERVICE HERE
export const MemberGenderHistoryAPI = apiCrudService

// Custom API for fetching Member Gender History by Profile ID
export const getMemberGenderHistoryById = async ({
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
            url: `${MemberGenderHistoryAPI.route}/member-profile/${profileId}/search`,
            query,
        },
        { skipNull: true }
    )

    const response =
        await MemberGenderHistoryAPI.API.get<IMemberGenderHistoryPaginated>(url)
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

// 🪝 Custom Hook for Fetching Member Gender History
export const useMemberGenderHistory = ({
    profileId,
    query,
    options,
}: {
    profileId: TEntityId
    query?: TAPIQueryOptions
    options?: HookQueryOptions<IMemberGenderHistoryPaginated, Error>
}) => {
    return useQuery<IMemberGenderHistoryPaginated, Error>({
        ...options,
        queryKey: [
            'member-gender-history',
            'member-profile',
            profileId,
            'paginated',
            query,
        ],
        queryFn: () => getMemberGenderHistoryById({ profileId, query }),
    })
}

export const logger = Logger.getInstance('member-gender-history')
