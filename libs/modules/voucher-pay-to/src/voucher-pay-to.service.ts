import type {
    IVoucherPayTo,
    IVoucherPayToRequest,
} from '@e-coop-monorepo/modules/voucher-pay-to'
import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/providers'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: voucherPayToBaseKey,
} = createDataLayerFactory<IVoucherPayTo, IVoucherPayToRequest>({
    url: '/api/v1/voucher-pay-to',
    baseKey: 'voucher-pay-to',
})

export const {
    API,
    route: voucherPayToAPIRoute,

    create: createVoucherPayTo,
    updateById: updateVoucherPayToById,

    deleteById: deleteVoucherPayToById,
    deleteMany: deleteManyVoucherPayTo,

    getById: getVoucherPayToById,
    getAll: getAllVoucherPayTo,
    getPaginated: getPaginatedVoucherPayTo,
} = apiCrudService

export { voucherPayToBaseKey }

export const {
    useCreate: useCreateVoucherPayTo,
    useUpdateById: useUpdateVoucherPayToById,

    useGetAll: useGetAllVoucherPayTo,
    useGetById: useGetVoucherPayToById,
    useGetPaginated: useGetPaginatedVoucherPayTo,

    useDeleteById: useDeleteVoucherPayToById,
    useDeleteMany: useDeleteManyVoucherPayTo,
} = apiCrudHooks

export const logger = Logger.getInstance('voucher-pay-to')
