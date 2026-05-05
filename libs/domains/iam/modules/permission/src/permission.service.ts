import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: permissionBaseKey,
} = createDataLayerFactory<{ id: string }, unknown>({
    // NO CRUD HERE
    url: '/api/v1/permission',
    baseKey: 'permission',
})

// ⚙️🛠️ API SERVICE HERE
export const {
    API, // rarely used, for raw calls
    route: permissionAPIRoute, // matches url above

    create: createPermission,
    updateById: updatePermissionById,

    deleteById: deletePermissionById,
    deleteMany: deleteManyPermissions,

    getById: getPermissionById,
    getAll: getAllPermissions,
    getPaginated: getPaginatedPermissions,
} = apiCrudService

// custom service functions can go here

// 🪝 HOOK STARTS HERE
export { permissionBaseKey } // Exported in case it's needed outside

export const {
    useCreate: useCreatePermission,
    useUpdateById: useUpdatePermissionById,

    useGetAll: useGetAllPermissions,
    useGetById: useGetPermissionById,
    useGetPaginated: useGetPaginatedPermissions,

    useDeleteById: useDeletePermissionById,
    useDeleteMany: useDeleteManyPermissions,
} = apiCrudHooks

// custom hooks can go here

export const logger = Logger.getInstance('permission')
