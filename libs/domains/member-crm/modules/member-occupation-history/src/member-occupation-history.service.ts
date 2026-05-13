import { useQuery } from '@tanstack/react-query'
import qs from 'query-string'

import type {
    IMemberOccupationHistory,
    IMemberOccupationHistoryPaginated,
} from '@ecoop/domains/member-crm/models'
import { Logger } from '@ecoop/shared/loggers'
import type { HookQueryOptions } from '@ecoop/shared/repositories'
import { createDataLayerFactory } from '@ecoop/shared/repositories'
import type { TAPIQueryOptions, TEntityId } from '@ecoop/shared/types'

const { apiCrudHooks, apiCrudService } = createDataLayerFactory<
    IMemberOccupationHistory,
    void
>({
    url: '/api/v1/member-occupation-history',
    baseKey: 'member-occupation-history',
})

// ⚙️🛠️ API SERVICE HERE
export const MemberOccupationHistoryAPI = apiCrudService

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

// Custom API for fetching Member Occupation History by Profile ID
export const getMemberOccupationHistoryById = async ({
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
            url: `${MemberOccupationHistoryAPI.route}/member-profile/${profileId}/search`,
            query,
        },
        { skipNull: true }
    )

    const response =
        await MemberOccupationHistoryAPI.API.get<IMemberOccupationHistoryPaginated>(
            url
        )
    return response.data
}

// 🪝 Custom Hook for Fetching Member Occupation History
export const useMemberOccupationHistory = ({
    profileId,
    query,
    options,
}: {
    profileId: TEntityId
    query?: TAPIQueryOptions
    options?: HookQueryOptions<IMemberOccupationHistoryPaginated, Error>
}) => {
    return useQuery<IMemberOccupationHistoryPaginated, Error>({
        ...options,
        queryKey: [
            'member-occupation-history',
            'member-profile',
            profileId,
            'paginated',
            query,
        ],
        queryFn: () => getMemberOccupationHistoryById({ profileId, query }),
    })
}

export const logger = Logger.getInstance('member-occupation-history')
