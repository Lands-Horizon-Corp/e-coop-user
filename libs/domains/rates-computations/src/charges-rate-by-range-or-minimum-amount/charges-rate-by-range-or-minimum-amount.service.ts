import { Logger } from '@ecoop/shared/helpers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

import type {
    IChargesRateByRangeOrMinimumAmount,
    IChargesRateByRangeOrMinimumAmountRequest,
} from '../charges-rate-by-range-or-minimum-amount'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: chargesRateByRangeOrMinimumAmountBaseKey,
} = createDataLayerFactory<
    IChargesRateByRangeOrMinimumAmount,
    IChargesRateByRangeOrMinimumAmountRequest
>({
    url: '/api/v1/charges-rate-by-range-or-minimum-amount',
    baseKey: 'charges-rate-by-range-or-minimum-amount',
})

// ⚙️🛠️ API SERVICE HERE
export const {
    API, // rarely used, for raw calls
    route: chargesRateByRangeOrMinimumAmountAPIRoute, // matches url above

    create: createChargesRateByRangeOrMinimumAmount,
    updateById: updateChargesRateByRangeOrMinimumAmountById,

    deleteById: deleteChargesRateByRangeOrMinimumAmountById,
    deleteMany: deleteManyChargesRateByRangeOrMinimumAmount,

    getById: getChargesRateByRangeOrMinimumAmountById,
    getAll: getAllChargesRateByRangeOrMinimumAmount,
    getPaginated: getPaginatedChargesRateByRangeOrMinimumAmount,
} = apiCrudService

// custom service functions can go here

// 🪝 HOOK STARTS HERE
export { chargesRateByRangeOrMinimumAmountBaseKey } // Exported in case it's needed outside

export const {
    useCreate: useCreateChargesRateByRangeOrMinimumAmount,
    useUpdateById: useUpdateChargesRateByRangeOrMinimumAmountById,

    useGetAll: useGetAllChargesRateByRangeOrMinimumAmount,
    useGetById: useGetChargesRateByRangeOrMinimumAmountById,
    useGetPaginated: useGetPaginatedChargesRateByRangeOrMinimumAmount,

    useDeleteById: useDeleteChargesRateByRangeOrMinimumAmountById,
    useDeleteMany: useDeleteManyChargesRateByRangeOrMinimumAmount,
} = apiCrudHooks

export const logger = Logger.getInstance(
    'charges-rate-by-range-or-minimum-amount'
)
// custom hooks can go here
