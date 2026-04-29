import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/repositories'

import type { ILoanAmortizationSchedule } from '../loan-amortization-schedule'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: loanAmortizationScheduleBaseKey,
} = createDataLayerFactory<ILoanAmortizationSchedule, void>({
    url: '/api/v1/loan-amortization-schedule',
    baseKey: 'loan-amortization-schedule',
})

// ⚙️🛠️ API SERVICE HERE
export const {
    API, // rarely used, for raw calls
    route: loanAmortizationScheduleAPIRoute, // matches url above

    create: createLoanAmortizationSchedule,
    updateById: updateLoanAmortizationScheduleById,

    deleteById: deleteLoanAmortizationScheduleById,
    deleteMany: deleteManyLoanAmortizationSchedule,

    getById: getLoanAmortizationScheduleById,
    getAll: getAllLoanAmortizationSchedule,
    getPaginated: getPaginatedLoanAmortizationSchedule,
} = apiCrudService

// custom service functions can go here

// 🪝 HOOK STARTS HERE
export { loanAmortizationScheduleBaseKey } // Exported in case it's needed outside

export const {
    useCreate: useCreateLoanAmortizationSchedule,
    useUpdateById: useUpdateLoanAmortizationScheduleById,

    useGetAll: useGetAllLoanAmortizationSchedule,
    useGetById: useGetLoanAmortizationScheduleById,
    useGetPaginated: useGetPaginatedLoanAmortizationSchedule,

    useDeleteById: useDeleteLoanAmortizationScheduleById,
    useDeleteMany: useDeleteManyLoanAmortizationSchedule,
} = apiCrudHooks

export const logger = Logger.getInstance('loan-amortization-schedule')
// custom hooks can go here
