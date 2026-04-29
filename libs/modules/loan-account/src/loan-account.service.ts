import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/repositories'

import type { ILoanAccount, ILoanAccountRequest } from '../loan-account'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: loanAccountBaseKey,
} = createDataLayerFactory<ILoanAccount, ILoanAccountRequest>({
    url: '/api/v1/loan-account',
    baseKey: 'loan-account',
})

// ⚙️🛠️ API SERVICE HERE
export const {
    API, // rarely used, for raw calls
    route: loanAccountAPIRoute, // matches url above

    create: createLoanAccount,
    updateById: updateLoanAccountById,

    deleteById: deleteLoanAccountById,
    deleteMany: deleteManyLoanAccount,

    getById: getLoanAccountById,
    getAll: getAllLoanAccount,
    getPaginated: getPaginatedLoanAccount,
} = apiCrudService

// custom service functions can go here

// 🪝 HOOK STARTS HERE
export { loanAccountBaseKey } // Exported in case it's needed outside

export const {
    useCreate: useCreateLoanAccount,
    useUpdateById: useUpdateLoanAccountById,

    useGetAll: useGetAllLoanAccount,
    useGetById: useGetLoanAccountById,
    useGetPaginated: useGetPaginatedLoanAccount,

    useDeleteById: useDeleteLoanAccountById,
    useDeleteMany: useDeleteManyLoanAccount,
} = apiCrudHooks

export const logger = Logger.getInstance('loan-account')
// custom hooks can go here
