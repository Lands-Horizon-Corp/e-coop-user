import type {
    IInterestRatePercentage,
    IInterestRatePercentageRequest,
} from '@e-coop-monorepo/modules/interest-rate-percentage'
import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/providers'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: interestRatePercentageBaseKey,
} = createDataLayerFactory<
    IInterestRatePercentage,
    IInterestRatePercentageRequest
>({
    url: '/api/v1/interest-rate-percentage',
    baseKey: 'interest-rate-percentage',
})

export const {
    API,
    route: interestRatePercentageAPIRoute,

    create: createInterestRatePercentage,
    updateById: updateInterestRatePercentageById,

    deleteById: deleteInterestRatePercentageById,
    deleteMany: deleteManyInterestRatePercentage,

    getById: getInterestRatePercentageById,
    getAll: getAllInterestRatePercentage,
    getPaginated: getPaginatedInterestRatePercentage,
} = apiCrudService

export { interestRatePercentageBaseKey }

export const {
    useCreate: useCreateInterestRatePercentage,
    useUpdateById: useUpdateInterestRatePercentageById,

    useGetAll: useGetAllInterestRatePercentage,
    useGetById: useGetInterestRatePercentageById,
    useGetPaginated: useGetPaginatedInterestRatePercentage,

    useDeleteById: useDeleteInterestRatePercentageById,
    useDeleteMany: useDeleteManyInterestRatePercentage,
} = apiCrudHooks

export const logger = Logger.getInstance('interest-rate-percentage')
