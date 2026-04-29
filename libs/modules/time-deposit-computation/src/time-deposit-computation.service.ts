import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/repositories'

import {
    ITimeDepositComputation,
    ITimeDepositComputationRequest,
} from './time-deposit-computation.types'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: timeDepositComputationBaseKey,
} = createDataLayerFactory<
    ITimeDepositComputation,
    ITimeDepositComputationRequest
>({
    url: '/api/v1/time-deposit-computation',
    baseKey: 'time-deposit-computation',
})

export const {
    API,
    route: timeDepositComputationAPIRoute,

    create: createTimeDepositComputation,
    updateById: updateTimeDepositComputationById,

    deleteById: deleteTimeDepositComputationById,
    deleteMany: deleteManyTimeDepositComputation,

    getById: getTimeDepositComputationById,
    getAll: getAllTimeDepositComputation,
    getPaginated: getPaginatedTimeDepositComputation,
} = apiCrudService

export { timeDepositComputationBaseKey }

export const {
    useCreate: useCreateTimeDepositComputation,
    useUpdateById: useUpdateTimeDepositComputationById,

    useGetAll: useGetAllTimeDepositComputation,
    useGetById: useGetTimeDepositComputationById,
    useGetPaginated: useGetPaginatedTimeDepositComputation,

    useDeleteById: useDeleteTimeDepositComputationById,
    useDeleteMany: useDeleteManyTimeDepositComputation,
} = apiCrudHooks

export const logger = Logger.getInstance('time-deposit-computation')
