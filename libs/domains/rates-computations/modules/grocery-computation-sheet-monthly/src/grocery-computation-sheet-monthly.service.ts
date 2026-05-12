import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

import type {
    IGroceryComputationSheetMonthly,
    IGroceryComputationSheetMonthlyRequest,
} from '@ecoop/rates-computations/models'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: groceryComputationSheetMonthlyBaseKey,
} = createDataLayerFactory<
    IGroceryComputationSheetMonthly,
    IGroceryComputationSheetMonthlyRequest
>({
    url: '/api/v1/grocery-computation-sheet-monthly',
    baseKey: 'grocery-computation-sheet-monthly',
})

export const {
    API,
    route: groceryComputationSheetMonthlyAPIRoute,

    create: createGroceryComputationSheetMonthly,
    updateById: updateGroceryComputationSheetMonthlyById,

    deleteById: deleteGroceryComputationSheetMonthlyById,
    deleteMany: deleteManyGroceryComputationSheetMonthly,

    getById: getGroceryComputationSheetMonthlyById,
    getAll: getAllGroceryComputationSheetMonthly,
    getPaginated: getPaginatedGroceryComputationSheetMonthly,
} = apiCrudService

export { groceryComputationSheetMonthlyBaseKey }

export const {
    useCreate: useCreateGroceryComputationSheetMonthly,
    useUpdateById: useUpdateGroceryComputationSheetMonthlyById,

    useGetAll: useGetAllGroceryComputationSheetMonthly,
    useGetById: useGetGroceryComputationSheetMonthlyById,
    useGetPaginated: useGetPaginatedGroceryComputationSheetMonthly,

    useDeleteById: useDeleteGroceryComputationSheetMonthlyById,
    useDeleteMany: useDeleteManyGroceryComputationSheetMonthly,
} = apiCrudHooks

export const logger = Logger.getInstance('grocery-computation-sheet-monthly')
