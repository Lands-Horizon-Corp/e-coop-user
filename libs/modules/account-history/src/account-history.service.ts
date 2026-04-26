import { useQuery } from '@tanstack/react-query'

import { Logger } from '@e-coop-monorepo/shared/helpers'
import {
    HookQueryOptions,
    createDataLayerFactory,
} from '@e-coop-monorepo/shared/providers'
import { createMutationFactory } from '@e-coop-monorepo/shared/providers'
import { TEntityId } from '@e-coop-monorepo/shared/types'

import type {
    IAccountHistory,
    IAccountHistoryRequest,
} from '../account-history'
import { accountBaseQueryKey } from '@e-coop-monorepo/modules/account'
import { IAccount } from '@e-coop-monorepo/modules/account'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: accountHistoryBaseKey,
} = createDataLayerFactory<IAccountHistory, IAccountHistoryRequest>({
    url: '/api/v1/account-history',
    baseKey: 'account-history',
})

export const {
    API,
    route: accountHistoryAPIRoute,

    create: createAccountHistory,
    updateById: updateAccountHistoryById,

    deleteById: deleteAccountHistoryById,
    deleteMany: deleteManyAccountHistory,

    getById: getAccountHistoryById,
    getAll: getAllAccountHistory,
    getPaginated: getPaginatedAccountHistory,
} = apiCrudService

export { accountHistoryBaseKey }

export const {
    useCreate: useCreateAccountHistory,
    useUpdateById: useUpdateAccountHistoryById,

    useGetAll: useGetAllAccountHistory,
    useGetById: useGetAccountHistoryById,
    useGetPaginated: useGetPaginatedAccountHistory,

    useDeleteById: useDeleteAccountHistoryById,
    useDeleteMany: useDeleteManyAccountHistory,
} = apiCrudHooks

const getAccountHistoryByAccountId = async (accountId: string) => {
    return (
        await API.get<IAccountHistory[]>(
            `${accountHistoryAPIRoute}/account/${accountId}`
        )
    ).data
}

export const useGetAccountHistoryByAccountId = ({
    options,
    query,
    accountId,
}: {
    accountId: TEntityId
    query?: Record<string, unknown>
    options?: HookQueryOptions<IAccountHistory[], Error>
}) => {
    return useQuery<IAccountHistory[], Error>({
        queryKey: [accountHistoryBaseKey, 'all', accountId, query].filter(
            Boolean
        ),
        queryFn: async () => {
            return getAccountHistoryByAccountId(accountId)
        },
        ...options,
    })
}

export const useAccountHistoryRestore = createMutationFactory<
    IAccount,
    Error,
    { accountHistoryId: TEntityId }
>({
    mutationFn: ({ accountHistoryId }) =>
        createAccountHistory<void | undefined, IAccount>({
            payload: undefined,
            url: `${accountHistoryAPIRoute}/${accountHistoryId}/restore`,
        }),
    invalidationFn: ({ variables, queryClient, resultData }) => {
        queryClient.invalidateQueries({
            queryKey: [accountBaseQueryKey, resultData.id],
        })

        queryClient.invalidateQueries({
            queryKey: [
                accountHistoryBaseKey,
                'all',
                variables.accountHistoryId,
            ],
        })
    },
    defaultInvalidates: [
        [accountHistoryBaseKey, 'paginated'],
        [accountHistoryBaseKey, 'all'],
    ],
})

export const logger = Logger.getInstance('account-history')
