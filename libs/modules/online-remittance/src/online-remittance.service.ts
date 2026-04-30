import { useQuery } from '@tanstack/react-query'

import { Logger } from '@e-coop-monorepo/shared/helpers'
import type {
    HookQueryOptions} from '@e-coop-monorepo/shared/providers';
import {
    createDataLayerFactory,
} from '@e-coop-monorepo/shared/providers'
import type { TEntityId } from '@e-coop-monorepo/shared/types'

import type {
    IOnlineRemittance,
    IOnlineRemittanceRequest,
} from './online-remittance.types'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: onlineRemittanceBaseKey,
} = createDataLayerFactory<IOnlineRemittance, IOnlineRemittanceRequest>({
    url: '/api/v1/online-remittance',
    baseKey: 'online-remittance',
})

// ⚙️🛠️ API SERVICE HERE
export const {
    API, // rarely used, for raw calls
    route: onlineRemittanceAPIRoute, // matches url above

    create: createOnlineRemittance,
    updateById: updateOnlineRemittanceById,

    deleteById: deleteOnlineRemittanceById,
    deleteMany: deleteManyOnlineRemittances,

    getById: getOnlineRemittanceById,
    getAll: getAllOnlineRemittances,
    getPaginated: getPaginatedOnlineRemittances,
} = apiCrudService

// custom service functions can go here

export const currentTransactionBatchOnlineRemittances = async () => {
    const response = await API.get<IOnlineRemittance[]>(
        onlineRemittanceAPIRoute
    )
    return response.data
}

export const updateTransactionBatchOnlineRemittance = async (
    id: TEntityId,
    data: IOnlineRemittanceRequest
) => {
    const response = await API.put<IOnlineRemittanceRequest, IOnlineRemittance>(
        `${onlineRemittanceAPIRoute}/${id}`,
        data
    )
    return response.data
}

export const deleteTransactionBatchOnlineRemittance = async (id: TEntityId) => {
    await API.delete(`${onlineRemittanceAPIRoute}/${id}`)
}

// 🪝 HOOK STARTS HERE
export { onlineRemittanceBaseKey } // Exported in case it's needed outside

export const {
    useCreate: useCreateOnlineRemittance,
    useUpdateById: useUpdateOnlineRemittanceById,

    useGetAll: useGetAllOnlineRemittances,
    useGetById: useGetOnlineRemittanceById,
    useGetPaginated: useGetPaginatedOnlineRemittances,

    useDeleteById: useDeleteOnlineRemittanceById,
    useDeleteMany: useDeleteManyOnlineRemittances,
} = apiCrudHooks

// custom hooks can go here

export const useCurrentBatchOnlineRemittances = ({
    options,
}: {
    options?: HookQueryOptions<IOnlineRemittance[], Error>
} = {}) => {
    return useQuery<IOnlineRemittance[], Error>({
        ...options,
        queryKey: [onlineRemittanceBaseKey, 'transaction-batch', 'current'],
        queryFn: async () => await currentTransactionBatchOnlineRemittances(),
    })
}

export const logger = Logger.getInstance('online-remittance')
