import { Logger } from '@ecoop/shared/helpers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

import type {
    IInterestRateByDate,
    IInterestRateByDateRequest,
} from '../interest-rate-by-date'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: interestRateByDateBaseKey,
} = createDataLayerFactory<IInterestRateByDate, IInterestRateByDateRequest>({
    url: '/api/v1/interest-rate-by-date',
    baseKey: 'interest-rate-by-date',
})

// ⚙️🛠️ API SERVICE HERE
export const {
    API, // rarely used, for raw calls
    route: interestRateByDateAPIRoute, // matches url above

    create: createInterestRateByDate,
    updateById: updateInterestRateByDateById,

    deleteById: deleteInterestRateByDateById,
    deleteMany: deleteManyInterestRateByDate,

    getById: getInterestRateByDateById,
    getAll: getAllInterestRateByDate,
    getPaginated: getPaginatedInterestRateByDate,
} = apiCrudService

// custom service functions can go here

// 🪝 HOOK STARTS HERE
export { interestRateByDateBaseKey } // Exported in case it's needed outside

export const {
    useCreate: useCreateInterestRateByDate,
    useUpdateById: useUpdateInterestRateByDateById,

    useGetAll: useGetAllInterestRateByDate,
    useGetById: useGetInterestRateByDateById,
    useGetPaginated: useGetPaginatedInterestRateByDate,

    useDeleteById: useDeleteInterestRateByDateById,
    useDeleteMany: useDeleteManyInterestRateByDate,
} = apiCrudHooks

export const logger = Logger.getInstance('interest-rate-by-date')
// custom hooks can go here
