import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/repositories'

import { IFunds, IFundsRequest } from './funds.types'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: fundsBaseKey,
} = createDataLayerFactory<IFunds, IFundsRequest>({
    url: '/api/v1/funds',
    baseKey: 'funds',
})

export const {
    API,
    route: fundsAPIRoute,

    create: createFunds,
    updateById: updateFundsById,

    deleteById: deleteFundsById,
    deleteMany: deleteManyFunds,

    getById: getFundsById,
    getAll: getAllFunds,
    getPaginated: getPaginatedFunds,
} = apiCrudService

export { fundsBaseKey }

export const {
    useCreate: useCreateFunds,
    useUpdateById: useUpdateFundsById,

    useGetAll: useGetAllFunds,
    useGetById: useGetFundsById,
    useGetPaginated: useGetPaginatedFunds,

    useDeleteById: useDeleteFundsById,
    useDeleteMany: useDeleteManyFunds,
} = apiCrudHooks

export const logger = Logger.getInstance('funds')
