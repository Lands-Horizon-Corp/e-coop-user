import type {
    IPostDatedCheck,
    IPostDatedCheckRequest,
} from '@e-coop-monorepo/modules/post-dated-check'
import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/providers'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: postDatedCheckBaseKey,
} = createDataLayerFactory<IPostDatedCheck, IPostDatedCheckRequest>({
    url: '/api/v1/post-dated-check',
    baseKey: 'post-dated-check',
})

export const {
    API,
    route: postDatedCheckAPIRoute,

    create: createPostDatedCheck,
    updateById: updatePostDatedCheckById,

    deleteById: deletePostDatedCheckById,
    deleteMany: deleteManyPostDatedCheck,

    getById: getPostDatedCheckById,
    getAll: getAllPostDatedCheck,
    getPaginated: getPaginatedPostDatedCheck,
} = apiCrudService

export { postDatedCheckBaseKey }

export const {
    useCreate: useCreatePostDatedCheck,
    useUpdateById: useUpdatePostDatedCheckById,

    useGetAll: useGetAllPostDatedCheck,
    useGetById: useGetPostDatedCheckById,
    useGetPaginated: useGetPaginatedPostDatedCheck,

    useDeleteById: useDeletePostDatedCheckById,
    useDeleteMany: useDeleteManyPostDatedCheck,
} = apiCrudHooks

export const logger = Logger.getInstance('post-dated-check')
