import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/providers'

import type {
    IAccountTransactionEntry,
    IAccountTransactionEntryRequest,
} from '../account-transaction-entry'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: accountTransactionEntryBaseKey,
} = createDataLayerFactory<
    IAccountTransactionEntry,
    IAccountTransactionEntryRequest
>({
    url: '/api/v1/account-transaction-entry',
    baseKey: 'account-transaction-entry',
})

// ⚙️🛠️ API SERVICE HERE
export const {
    API, // rarely used, for raw calls
    route: accountTransactionEntryAPIRoute, // matches url above

    create: createAccountTransactionEntry,
    updateById: updateAccountTransactionEntryById,

    deleteById: deleteAccountTransactionEntryById,
    deleteMany: deleteManyAccountTransactionEntry,

    getById: getAccountTransactionEntryById,
    getAll: getAllAccountTransactionEntry,
    getPaginated: getPaginatedAccountTransactionEntry,
} = apiCrudService

// custom service functions can go here

// 🪝 HOOK STARTS HERE
export { accountTransactionEntryBaseKey } // Exported in case it's needed outside

export const {
    useCreate: useCreateAccountTransactionEntry,
    useUpdateById: useUpdateAccountTransactionEntryById,

    useGetAll: useGetAllAccountTransactionEntry,
    useGetById: useGetAccountTransactionEntryById,
    useGetPaginated: useGetPaginatedAccountTransactionEntry,

    useDeleteById: useDeleteAccountTransactionEntryById,
    useDeleteMany: useDeleteManyAccountTransactionEntry,
} = apiCrudHooks

export const logger = Logger.getInstance('account-transaction-entry')
// custom hooks can go here
