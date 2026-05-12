import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'
import { createMutationFactory } from '@ecoop/shared/repositories'

import type {
    ITimeDepositType,
    ITimeDepositTypeCreateRequest,
    ITimeDepositTypeRequest,
} from '@ecoop/savings-investments/models'

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
