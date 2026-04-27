import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/providers'
import { createMutationFactory } from '@e-coop-monorepo/shared/providers'

import {
    ITimeDepositType,
    ITimeDepositTypeCreateRequest,
    ITimeDepositTypeRequest,
} from './time-deposit-type.types'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: timeDepositTypeBaseKey,
} = createDataLayerFactory<ITimeDepositType, ITimeDepositTypeRequest>({
    url: '/api/v1/time-deposit-type',
    baseKey: 'time-deposit-type',
})

export const {
    API,
    route: timeDepositTypeAPIRoute,

    create: createTimeDepositType,
    updateById: updateTimeDepositTypeById,

    deleteById: deleteTimeDepositTypeById,
    deleteMany: deleteManyTimeDepositType,

    getById: getTimeDepositTypeById,
    getAll: getAllTimeDepositType,
    getPaginated: getPaginatedTimeDepositType,
} = apiCrudService

export { timeDepositTypeBaseKey }

export const {
    // useCreate: useCreateTimeDepositType,
    useUpdateById: useUpdateTimeDepositTypeById,

    useGetAll: useGetAllTimeDepositType,
    useGetById: useGetTimeDepositTypeById,
    useGetPaginated: useGetPaginatedTimeDepositType,

    useDeleteById: useDeleteTimeDepositTypeById,
    useDeleteMany: useDeleteManyTimeDepositType,
} = apiCrudHooks

export const useCreateTimeDepositType = createMutationFactory<
    ITimeDepositType,
    Error,
    ITimeDepositTypeCreateRequest
>({
    mutationFn: (payload) =>
        createTimeDepositType<ITimeDepositTypeCreateRequest>({ payload }),
    defaultInvalidates: [
        [timeDepositTypeBaseKey, 'paginated'],
        [timeDepositTypeBaseKey, 'all'],
    ],
})

export const logger = Logger.getInstance('time-deposit-type')
