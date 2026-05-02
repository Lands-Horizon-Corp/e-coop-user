import { Logger } from '@ecoop/shared/helpers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

import type {
    IFinesMaturity,
    IFinesMaturityRequest,
} from './fines-maturity.types'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: finesMaturityBaseKey,
} = createDataLayerFactory<IFinesMaturity, IFinesMaturityRequest>({
    url: '/api/v1/fines-maturity',
    baseKey: 'fines-maturity',
})

export const {
    API,
    route: finesMaturityAPIRoute,

    create: createFinesMaturity,
    updateById: updateFinesMaturityById,

    deleteById: deleteFinesMaturityById,
    deleteMany: deleteManyFinesMaturity,

    getById: getFinesMaturityById,
    getAll: getAllFinesMaturity,
    getPaginated: getPaginatedFinesMaturity,
} = apiCrudService

export { finesMaturityBaseKey }

export const {
    useCreate: useCreateFinesMaturity,
    useUpdateById: useUpdateFinesMaturityById,

    useGetAll: useGetAllFinesMaturity,
    useGetById: useGetFinesMaturityById,
    useGetPaginated: useGetPaginatedFinesMaturity,

    useDeleteById: useDeleteFinesMaturityById,
    useDeleteMany: useDeleteManyFinesMaturity,
} = apiCrudHooks

export const logger = Logger.getInstance('fines-maturity')
