import { Logger } from '@ecoop/shared/helpers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

import type {
    IChargesRateSchemeModeOfPayment,
    IChargesRateSchemeModeOfPaymentRequest,
} from './charges-rate-scheme-mode-of-payment.types'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: chargesRateSchemeModeOfPaymentBaseKey,
} = createDataLayerFactory<
    IChargesRateSchemeModeOfPayment,
    IChargesRateSchemeModeOfPaymentRequest
>({
    url: '/api/v1/charges-rate-schema-mode-of-payment',
    baseKey: 'charges-rate-schema-mode-of-payment',
})

// ⚙️🛠️ API SERVICE HERE
export const {
    API, // rarely used, for raw calls
    route: chargesRateSchemeModeOfPaymentAPIRoute, // matches url above

    create: createChargesRateSchemeModeOfPayment,
    updateById: updateChargesRateSchemeModeOfPaymentById,

    deleteById: deleteChargesRateSchemeModeOfPaymentById,
    deleteMany: deleteManyChargesRateSchemeModeOfPayment,

    getById: getChargesRateSchemeModeOfPaymentById,
    getAll: getAllChargesRateSchemeModeOfPayment,
    getPaginated: getPaginatedChargesRateSchemeModeOfPayment,
} = apiCrudService

// custom service functions can go here

// 🪝 HOOK STARTS HERE
export { chargesRateSchemeModeOfPaymentBaseKey } // Exported in case it's needed outside

export const {
    useCreate: useCreateChargesRateSchemeModeOfPayment,
    useUpdateById: useUpdateChargesRateSchemeModeOfPaymentById,

    useGetAll: useGetAllChargesRateSchemeModeOfPayment,
    useGetById: useGetChargesRateSchemeModeOfPaymentById,
    useGetPaginated: useGetPaginatedChargesRateSchemeModeOfPayment,

    useDeleteById: useDeleteChargesRateSchemeModeOfPaymentById,
    useDeleteMany: useDeleteManyChargesRateSchemeModeOfPayment,
} = apiCrudHooks

export const logger = Logger.getInstance('charges-rate-schema-mode-of-payment')
// custom hooks can go here
