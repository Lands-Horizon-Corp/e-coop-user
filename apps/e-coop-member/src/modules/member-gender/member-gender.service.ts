import { useQuery } from '@tanstack/react-query'

import type { HookQueryOptions } from '@e-coop-monorepo/shared/repositories'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/repositories'
import type { TAPIQueryOptions, TEntityId } from '@e-coop-monorepo/shared/types'

import type { IMemberGender, IMemberGenderRequest } from './member-gender.types'

const { apiCrudService, baseQueryKey: memberGenderBaseQueryKey } =
    createDataLayerFactory<IMemberGender, IMemberGenderRequest>({
        url: '/api/v1/member-gender',
        baseKey: 'member-gender',
    })

export const { getAll: getAllMemberGender, route: memberGenderAPIRoute } =
    apiCrudService

export type TMemberGenderHookMode = 'current' | 'branch-id'

export const useGetAllMemberGender = ({
    mode,
    query,
    options,
    branchId,
}: {
    query?: TAPIQueryOptions
    mode?: TMemberGenderHookMode
    branchId?: TEntityId
    options?: HookQueryOptions<IMemberGender[], Error>
} = {}) => {
    return useQuery<IMemberGender[], Error>({
        ...options,
        queryKey: [memberGenderBaseQueryKey, mode, branchId, query].filter(
            Boolean
        ),
        queryFn: async () => {
            let url = `${memberGenderAPIRoute}`

            if (mode == 'branch-id')
                url = `${memberGenderAPIRoute}/branch/${branchId}`

            return getAllMemberGender({
                url,
                query,
            })
        },
    })
}
