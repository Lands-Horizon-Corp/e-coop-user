import type {
    IInterestMaturity,
    IInterestMaturityRequest,
} from '@ecoop/domains/rates-computations/models'
import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: interestMaturityBaseKey,
} = createDataLayerFactory<IInterestMaturity, IInterestMaturityRequest>({
    url: '/api/v1/interest-maturity',
    baseKey: 'interest-maturity',
})

export const {
    API,
    route: interestMaturityAPIRoute,

    create: createInterestMaturity,
    updateById: updateInterestMaturityById,

    deleteById: deleteInterestMaturityById,
    deleteMany: deleteManyInterestMaturity,

    getById: getInterestMaturityById,
    getAll: getAllInterestMaturity,
    getPaginated: getPaginatedInterestMaturity,
} = apiCrudService

export { interestMaturityBaseKey }

export const {
    useCreate: useCreateInterestMaturity,
    useUpdateById: useUpdateInterestMaturityById,

    useGetAll: useGetAllInterestMaturity,
    useGetById: useGetInterestMaturityById,
    useGetPaginated: useGetPaginatedInterestMaturity,

    useDeleteById: useDeleteInterestMaturityById,
    useDeleteMany: useDeleteManyInterestMaturity,
} = apiCrudHooks

export const logger = Logger.getInstance('interest-maturity')
