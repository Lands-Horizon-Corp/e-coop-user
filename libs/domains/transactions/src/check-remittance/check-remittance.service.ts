import { useQuery } from '@tanstack/react-query'

import { useDeleteById } from '@ecoop/domains/iam'
import { Logger } from '@ecoop/shared/loggers'
import type { HookQueryOptions } from '@ecoop/shared/repositories'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

import type {
    ICheckRemittance,
    ICheckRemittanceRequest,
} from '../check-remittance'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: checkRemittanceBaseKey,
} = createDataLayerFactory<ICheckRemittance, ICheckRemittanceRequest>({
    url: '/api/v1/check-remittance',
    baseKey: 'check-remittance',
})

// ⚙️🛠️ API SERVICE HERE
export const {
    API, // rarely used, for raw calls
    route: checkRemittanceAPIRoute, // matches url above

    create: createCheckRemittance,
    updateById: updateCheckRemittanceById,

    deleteById: deleteCheckRemittanceById,
    deleteMany: deleteManyCheckRemittances,

    getById: getCheckRemittanceById,
    getAll: getAllCheckRemittances,
    getPaginated: getPaginatedCheckRemittances,
} = apiCrudService

// custom service functions can go here

export const currentTransactionBatchCheckRemittances = getAllCheckRemittances

// 🪝 HOOK STARTS HERE
export { checkRemittanceBaseKey } // Exported in case it's needed outside

export const {
    useCreate: useCreateCheckRemittance,
    useUpdateById: useUpdateCheckRemittanceById,

    useGetAll: useGetAllCheckRemittances,
    useGetById: useGetCheckRemittanceById,
    useGetPaginated: useGetPaginatedCheckRemittances,

    useDeleteById: useDeleteCheckRemittanceById,
    useDeleteMany: useDeleteManyCheckRemittances,
} = apiCrudHooks
// custom hooks can go here

export const useCurrentBatchCheckRemittances = ({
    options,
}: {
    options?: HookQueryOptions<ICheckRemittance[], Error>
} = {}) => {
    return useQuery<ICheckRemittance[], Error>({
        ...options,
        queryKey: [checkRemittanceBaseKey, 'transaction-batch', 'current'],
        queryFn: async () => currentTransactionBatchCheckRemittances(),
    })
}

export const useDeleteBatchCheckRemittance = useDeleteById

export const logger = Logger.getInstance('check-remittance')
