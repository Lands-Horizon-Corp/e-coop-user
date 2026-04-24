import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/providers'

import type { ICollateral, ICollateralRequest } from '../collateral'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: collateralBaseKey,
} = createDataLayerFactory<ICollateral, ICollateralRequest>({
    url: '/api/v1/collateral',
    baseKey: 'collateral',
})

// ⚙️🛠️ API SERVICE HERE
export const {
    API, // rarely used, for raw calls
    route: collateralAPIRoute, // matches url above

    create: createCollateral,
    updateById: updateCollateralById,

    deleteById: deleteCollateralById,
    deleteMany: deleteManyCollateral,

    getById: getCollateralById,
    getAll: getAllCollateral,
    getPaginated: getPaginatedCollateral,
} = apiCrudService

// custom service functions can go here

// 🪝 HOOK STARTS HERE
export { collateralBaseKey } // Exported in case it's needed outside

export const {
    useCreate: useCreateCollateral,
    useUpdateById: useUpdateCollateralById,

    useGetAll: useGetAllCollateral,
    useGetById: useGetCollateralById,
    useGetPaginated: useGetPaginatedCollateral,

    useDeleteById: useDeleteCollateralById,
    useDeleteMany: useDeleteManyCollateral,
} = apiCrudHooks

// custom hooks can go here

export const logger = Logger.getInstance('collateral')
