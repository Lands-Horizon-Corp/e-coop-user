import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/providers'

import type {
    IInterestRateByYear,
    IInterestRateByYearRequest,
} from '../interest-rate-by-year'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: interestRateByYearBaseKey,
} = createDataLayerFactory<IInterestRateByYear, IInterestRateByYearRequest>({
    url: '/api/v1/interest-rate-by-year',
    baseKey: 'interest-rate-by-year',
})

// ⚙️🛠️ API SERVICE HERE
export const {
    API, // rarely used, for raw calls
    route: interestRateByYearAPIRoute, // matches url above

    create: createInterestRateByYear,
    updateById: updateInterestRateByYearById,

    deleteById: deleteInterestRateByYearById,
    deleteMany: deleteManyInterestRateByYear,

    getById: getInterestRateByYearById,
    getAll: getAllInterestRateByYear,
    getPaginated: getPaginatedInterestRateByYear,
} = apiCrudService

// custom service functions can go here

// 🪝 HOOK STARTS HERE
export { interestRateByYearBaseKey } // Exported in case it's needed outside

export const {
    useCreate: useCreateInterestRateByYear,
    useUpdateById: useUpdateInterestRateByYearById,

    useGetAll: useGetAllInterestRateByYear,
    useGetById: useGetInterestRateByYearById,
    useGetPaginated: useGetPaginatedInterestRateByYear,

    useDeleteById: useDeleteInterestRateByYearById,
    useDeleteMany: useDeleteManyInterestRateByYear,
} = apiCrudHooks

export const logger = Logger.getInstance('interest-rate-by-year')
// custom hooks can go here
