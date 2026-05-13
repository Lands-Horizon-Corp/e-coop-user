import type {
    ILoanGuaranteedFundPerMonth,
    ILoanGuaranteedFundPerMonthRequest,
} from '@ecoop/domains/loans/models'
import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: loanGuaranteedFundPerMonthBaseKey,
} = createDataLayerFactory<
    ILoanGuaranteedFundPerMonth,
    ILoanGuaranteedFundPerMonthRequest
>({
    url: '/api/v1/loan-guaranteed-fund-per-month',
    baseKey: 'loan-guaranteed-fund-per-month',
})

export const {
    API,
    route: loanGuaranteedFundPerMonthAPIRoute,

    create: createLoanGuaranteedFundPerMonth,
    updateById: updateLoanGuaranteedFundPerMonthById,

    deleteById: deleteLoanGuaranteedFundPerMonthById,
    deleteMany: deleteManyLoanGuaranteedFundPerMonth,

    getById: getLoanGuaranteedFundPerMonthById,
    getAll: getAllLoanGuaranteedFundPerMonth,
    getPaginated: getPaginatedLoanGuaranteedFundPerMonth,
} = apiCrudService

export { loanGuaranteedFundPerMonthBaseKey }

export const {
    useCreate: useCreateLoanGuaranteedFundPerMonth,
    useUpdateById: useUpdateLoanGuaranteedFundPerMonthById,

    useGetAll: useGetAllLoanGuaranteedFundPerMonth,
    useGetById: useGetLoanGuaranteedFundPerMonthById,
    useGetPaginated: useGetPaginatedLoanGuaranteedFundPerMonth,

    useDeleteById: useDeleteLoanGuaranteedFundPerMonthById,
    useDeleteMany: useDeleteManyLoanGuaranteedFundPerMonth,
} = apiCrudHooks

export const logger = Logger.getInstance('loan-guaranteed-fund-per-month')
