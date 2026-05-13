import type {
    ILoanGuaranteedFund,
    ILoanGuaranteedFundRequest,
} from '@ecoop/domains/loans/models'
import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: loanGuaranteedFundBaseKey,
} = createDataLayerFactory<ILoanGuaranteedFund, ILoanGuaranteedFundRequest>({
    url: '/api/v1/loan-guaranteed-fund',
    baseKey: 'loan-guaranteed-fund',
})

export const {
    API,
    route: loanGuaranteedFundAPIRoute,

    create: createLoanGuaranteedFund,
    updateById: updateLoanGuaranteedFundById,

    deleteById: deleteLoanGuaranteedFundById,
    deleteMany: deleteManyLoanGuaranteedFund,

    getById: getLoanGuaranteedFundById,
    getAll: getAllLoanGuaranteedFund,
    getPaginated: getPaginatedLoanGuaranteedFund,
} = apiCrudService

export { loanGuaranteedFundBaseKey }

export const {
    useCreate: useCreateLoanGuaranteedFund,
    useUpdateById: useUpdateLoanGuaranteedFundById,

    useGetAll: useGetAllLoanGuaranteedFund,
    useGetById: useGetLoanGuaranteedFundById,
    useGetPaginated: useGetPaginatedLoanGuaranteedFund,

    useDeleteById: useDeleteLoanGuaranteedFundById,
    useDeleteMany: useDeleteManyLoanGuaranteedFund,
} = apiCrudHooks

export const logger = Logger.getInstance('loan-guaranteed-fund')
