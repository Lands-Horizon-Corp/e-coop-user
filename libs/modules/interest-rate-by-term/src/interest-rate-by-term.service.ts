import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/repositories'

import {
    IInterestRateByTerm,
    IInterestRateByTermRequest,
} from './interest-rate-by-term.types'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: interestRateByTermBaseKey,
} = createDataLayerFactory<IInterestRateByTerm, IInterestRateByTermRequest>({
    url: '/api/v1/interest-rate-by-term',
    baseKey: 'interest-rate-by-term',
})

export const {
    API,
    route: interestRateByTermAPIRoute,

    create: createInterestRateByTerm,
    updateById: updateInterestRateByTermById,

    deleteById: deleteInterestRateByTermById,
    deleteMany: deleteManyInterestRateByTerm,

    getById: getInterestRateByTermById,
    getAll: getAllInterestRateByTerm,
    getPaginated: getPaginatedInterestRateByTerm,
} = apiCrudService

export { interestRateByTermBaseKey }

export const {
    useCreate: useCreateInterestRateByTerm,
    useUpdateById: useUpdateInterestRateByTermById,

    useGetAll: useGetAllInterestRateByTerm,
    useGetById: useGetInterestRateByTermById,
    useGetPaginated: useGetPaginatedInterestRateByTerm,

    useDeleteById: useDeleteInterestRateByTermById,
    useDeleteMany: useDeleteManyInterestRateByTerm,
} = apiCrudHooks

export const logger = Logger.getInstance('interest-rate-by-term')
