import { IGroceryComputationSheet, IGroceryComputationSheetRequest } from './grocery-computation-sheet.types';
import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/providers'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: groceryComputationSheetBaseKey,
} = createDataLayerFactory<
    IGroceryComputationSheet,
    IGroceryComputationSheetRequest
>({
    url: '/api/v1/grocery-computation-sheet',
    baseKey: 'grocery-computation-sheet',
})

export const {
    API,
    route: groceryComputationSheetAPIRoute,

    create: createGroceryComputationSheet,
    updateById: updateGroceryComputationSheetById,

    deleteById: deleteGroceryComputationSheetById,
    deleteMany: deleteManyGroceryComputationSheet,

    getById: getGroceryComputationSheetById,
    getAll: getAllGroceryComputationSheet,
    getPaginated: getPaginatedGroceryComputationSheet,
} = apiCrudService

export { groceryComputationSheetBaseKey }

export const {
    useCreate: useCreateGroceryComputationSheet,
    useUpdateById: useUpdateGroceryComputationSheetById,

    useGetAll: useGetAllGroceryComputationSheet,
    useGetById: useGetGroceryComputationSheetById,
    useGetPaginated: useGetPaginatedGroceryComputationSheet,

    useDeleteById: useDeleteGroceryComputationSheetById,
    useDeleteMany: useDeleteManyGroceryComputationSheet,
} = apiCrudHooks

export const logger = Logger.getInstance('grocery-computation-sheet')
