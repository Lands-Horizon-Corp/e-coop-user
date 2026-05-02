import { Logger } from '@ecoop/shared/helpers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

import type { IDisbursement, IDisbursementRequest } from './disbursement.types'

const { apiCrudHooks, apiCrudService, baseQueryKey } = createDataLayerFactory<
    IDisbursement,
    IDisbursementRequest
>({
    url: '/api/v1/disbursement',
    baseKey: 'disbursement',
})

// ⚙️🛠️ API SERVICE HERE
export const {
    API,
    route: disbursementAPIRoute,

    create: createDisbursement,
    updateById: updateDisbursementById,

    deleteById: deleteDisbursementById,
    deleteMany: deleteManyDisbursements,

    getById: getDisbursementById,
    getAll: getAllDisbursements,
    getPaginated: getPaginatedDisbursements,
} = apiCrudService

// 🪝 HOOK STARTS HERE
export { baseQueryKey } // Exported in case it's needed outside

export const {
    useCreate: useCreateDisbursement,
    useDeleteById: useDeleteDisbursementById,
    useDeleteMany: useDeleteManyDisbursements,
    useGetAll: useGetAllDisbursements,
    useGetById: useGetDisbursementById,
    useGetPaginated: useGetPaginatedDisbursements,
    useUpdateById: useUpdateDisbursementById,
} = apiCrudHooks

export const logger = Logger.getInstance('disbursement')
