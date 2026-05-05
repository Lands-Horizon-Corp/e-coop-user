import { loanTransactionBaseKey } from '@ecoop/domains/loans/modules/loan-transaction'
import { Logger } from '@ecoop/shared/loggers'
import {
    createMutationFactory,
    updateMutationInvalidationFn,
} from '@ecoop/shared/repositories'
import { createDataLayerFactory } from '@ecoop/shared/repositories'
import type { TEntityId } from '@ecoop/shared/types'

import type {
    ILoanLedger,
    ILoanLedgerChangeLineRequest,
    ILoanLedgerRequest,
} from '../loan-ledger'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: loanLedgerBaseKey,
} = createDataLayerFactory<ILoanLedger, ILoanLedgerRequest>({
    url: '/api/v1/loan-ledger',
    baseKey: 'loan-ledger',
})

// ⚙️🛠️ API SERVICE HERE
export const {
    API, // rarely used, for raw calls
    route: loanLedgerAPIRoute, // matches url above

    create: createLoanLedger,
    updateById: updateLoanLedgerById,

    deleteById: deleteLoanLedgerById,
    deleteMany: deleteManyLoanLedger,

    getById: getLoanLedgerById,
    getAll: getAllLoanLedger,
    getPaginated: getPaginatedLoanLedger,
} = apiCrudService

// custom service functions can go here

// 🪝 HOOK STARTS HERE
export { loanLedgerBaseKey } // Exported in case it's needed outside

export const {
    useCreate: useCreateLoanLedger,
    useUpdateById: useUpdateLoanLedgerById,

    useGetAll: useGetAllLoanLedger,
    useGetById: useGetLoanLedgerById,
    useGetPaginated: useGetPaginatedLoanLedger,

    useDeleteById: useDeleteLoanLedgerById,
    useDeleteMany: useDeleteManyLoanLedger,
} = apiCrudHooks

// custom hooks can go here

// update loan ledger print line number
export const useChangeLoanLedgerLineNumber = createMutationFactory<
    ILoanLedger,
    Error,
    { id: TEntityId; payload: ILoanLedgerChangeLineRequest }
>({
    mutationFn: async (variables) => {
        const request = await API.post<
            ILoanLedgerChangeLineRequest,
            ILoanLedger
        >(
            `${loanLedgerAPIRoute}/${variables.id}/change-line`,
            variables.payload
        )

        return request.data
    },
    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: [loanTransactionBaseKey, 'paginated'],
        })
        updateMutationInvalidationFn(loanLedgerBaseKey, args)
    },
})

export const logger = Logger.getInstance('loan-ledger')
