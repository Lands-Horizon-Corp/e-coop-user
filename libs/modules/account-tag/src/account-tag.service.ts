import { useQuery } from '@tanstack/react-query'

import { Logger } from '@e-coop-monorepo/shared/helpers'
import type { HookQueryOptions } from '@e-coop-monorepo/shared/repositories'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/repositories'
import type { TAPIQueryOptions, TEntityId } from '@e-coop-monorepo/shared/types'

import type { IAccounTagRequest, IAccountTag } from './account-tag.types'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: accountTagBaseQueryKey,
} = createDataLayerFactory<IAccountTag, IAccounTagRequest>({
    url: 'api/v1/account-tag',
    baseKey: 'account-tag',
})

export const {
    API,
    route: accountTagAPIRoute,
    getAll: getAllAccountTag,
} = apiCrudService

export { accountTagBaseQueryKey }

export const {
    useCreate: useCreateAccountTag,
    useDeleteById: useDeleteAccountTagById,
    useUpdateById,
    useGetById,
    useGetAll,
    useDeleteMany,
    useGetPaginated,
} = apiCrudHooks

export type TGetAllAccountTagHookMode = 'all' | 'account-tag'

export const useGetAllAccountTag = ({
    query,
    mode = 'all',
    options,
    accountId,
}: {
    query?: TAPIQueryOptions
    mode: TGetAllAccountTagHookMode
    options?: HookQueryOptions<IAccountTag[], Error>
    accountId?: TEntityId
}) => {
    return useQuery<IAccountTag[], Error>({
        queryKey: ['getAll', mode, query, accountId],
        queryFn: async () => {
            let url = accountTagAPIRoute
            if (mode === 'account-tag' && accountId) {
                url = `${accountTagAPIRoute}/account/${accountId}`
            }
            return getAllAccountTag({ query, url })
        },
        ...options,
    })
}

export const logger = Logger.getInstance('account-tag')
