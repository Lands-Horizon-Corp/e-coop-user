import type {
    IPaymentType,
    IPaymentTypeRequest,
} from '@ecoop/domains/transactions/models'
import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

const { apiCrudHooks, apiCrudService } = createDataLayerFactory<
    IPaymentType,
    IPaymentTypeRequest
>({
    url: '/api/v1/payment-type',
    baseKey: 'payment-type',
})

export const {
    useGetById,
    useGetAll: useGetAllPaymentType,
    useCreate,
    useUpdateById,
    useDeleteById,
    useDeleteMany,
    useGetPaginated,
} = apiCrudHooks

export const { deleteById, deleteMany } = apiCrudService

export const logger = Logger.getInstance('payment-type')
