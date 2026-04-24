import type {
    ILoanGuaranteedFundPerMonth,
    ILoanGuaranteedFundPerMonthRequest,
} from '@e-coop-monorepo/modules/loan-guaranteed-fund-per-month'
import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/providers'

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
