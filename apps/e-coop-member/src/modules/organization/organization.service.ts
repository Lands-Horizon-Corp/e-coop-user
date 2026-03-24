import { createDataLayerFactory } from '@/providers/repositories/data-layer-factory'

// import { Logger } from '@/helpers/loggers'

import type { IOrganization, IOrganizationRequest } from '../organization'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: organizationBaseKey,
} = createDataLayerFactory<IOrganization, IOrganizationRequest>({
    url: '/api/v1/organization',
    baseKey: 'organization',
})

// ⚙️🛠️ API SERVICE HERE
export const {
    API, // rarely used, for raw calls
    route: organizationAPIRoute, // matches url above

    create: createOrganization,
    updateById: updateOrganizationById,

    deleteById: deleteOrganizationById,
    deleteMany: deleteManyOrganization,

    getById: getOrganizationById,
    getAll: getAllOrganization,
    getPaginated: getPaginatedOrganization,
} = apiCrudService

// custom service functions can go here

// 🪝 HOOK STARTS HERE
export { organizationBaseKey } // Exported in case it's needed outside

export const {
    useCreate: useCreateOrganization,
    useUpdateById: useUpdateOrganizationById,

    useGetAll: useGetAllOrganization,
    useGetById: useGetOrganizationById,
    useGetPaginated: useGetPaginatedOrganization,

    useDeleteById: useDeleteOrganizationById,
    useDeleteMany: useDeleteManyOrganization,
} = apiCrudHooks

// export const logger = Logger.getInstance('organization')
// custom hooks can go here
