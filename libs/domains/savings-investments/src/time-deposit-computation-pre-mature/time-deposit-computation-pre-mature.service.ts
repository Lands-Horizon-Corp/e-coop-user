import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

import type {
    ITimeDepositComputationPreMature,
    ITimeDepositComputationPreMatureRequest,
} from '../time-deposit-computation-pre-mature'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: timeDepositComputationPreMatureBaseKey,
} = createDataLayerFactory<
    ITimeDepositComputationPreMature,
    ITimeDepositComputationPreMatureRequest
>({
    url: '/api/v1/time-deposit-computation-pre-mature',
    baseKey: 'time-deposit-computation-pre-mature',
})

// ⚙️🛠️ API SERVICE HERE
export const {
    API, // rarely used, for raw calls
    route: timeDepositComputationPreMatureAPIRoute, // matches url above

    create: createTimeDepositComputationPreMature,
    updateById: updateTimeDepositComputationPreMatureById,

    deleteById: deleteTimeDepositComputationPreMatureById,
    deleteMany: deleteManyTimeDepositComputationPreMature,

    getById: getTimeDepositComputationPreMatureById,
    getAll: getAllTimeDepositComputationPreMature,
    getPaginated: getPaginatedTimeDepositComputationPreMature,
} = apiCrudService

// custom service functions can go here

// 🪝 HOOK STARTS HERE
export { timeDepositComputationPreMatureBaseKey } // Exported in case it's needed outside

export const {
    useCreate: useCreateTimeDepositComputationPreMature,
    useUpdateById: useUpdateTimeDepositComputationPreMatureById,

    useGetAll: useGetAllTimeDepositComputationPreMature,
    useGetById: useGetTimeDepositComputationPreMatureById,
    useGetPaginated: useGetPaginatedTimeDepositComputationPreMature,

    useDeleteById: useDeleteTimeDepositComputationPreMatureById,
    useDeleteMany: useDeleteManyTimeDepositComputationPreMature,
} = apiCrudHooks

export const logger = Logger.getInstance('time-deposit-computation-pre-mature')
// custom hooks can go here
