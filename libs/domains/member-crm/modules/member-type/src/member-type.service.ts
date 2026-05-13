import type {
    IMemberType,
    IMemberTypeRequest,
} from '@ecoop/domains/member-crm/models'
import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

export const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: memberTypeBaseQueryKey,
} = createDataLayerFactory<IMemberType, IMemberTypeRequest>({
    url: '/api/v1/member-type',
    baseKey: 'member-type',
})

// Add custom CRUD API service here if needed

export const {
    useCreate: useCreateMemberType,
    useDeleteById: useDeleteMemberTypeById,
    useDeleteMany: useDeleteManyMemberTypes,
    useGetAll: useGetAllMemberTypes,
    useGetById: useGetMemberTypeById,
    useGetPaginated: useGetPaginatedMemberTypes,
    useUpdateById: useUpdateMemberTypeById,
} = apiCrudHooks

// Add custom API query hooks here if needed

export const {
    API,
    route: memberTypeAPIRoute,
    deleteMany: deleteManyMemberTypes,
} = apiCrudService

export const logger = Logger.getInstance('member-type')
