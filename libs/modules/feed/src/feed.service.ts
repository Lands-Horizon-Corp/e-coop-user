import {
    IFeedComment,
    IFeedCommentRequest,
} from '@e-coop-monorepo/modules/feed-comment'
import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/providers'
import { createMutationFactory } from '@e-coop-monorepo/shared/providers'
import { TEntityId } from '@e-coop-monorepo/shared/types'

import type { IFeed, IFeedRequest } from '../feed'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: feedBaseKey,
} = createDataLayerFactory<IFeed, IFeedRequest>({
    url: '/api/v1/feed',
    baseKey: 'feed',
})

// ⚙️🛠️ API SERVICE HERE
export const {
    API: FeedAPI, // rarely used, for raw calls
    route: feedAPIRoute, // matches url above

    create: createFeed,
    updateById: updateFeedById,

    deleteById: deleteFeedById,
    deleteMany: deleteManyFeed,

    getById: getFeedById,
    getAll: getAllFeed,
    getPaginated: getPaginatedFeed,
} = apiCrudService

// custom service functions can go here

// 🪝 HOOK STARTS HERE
export { feedBaseKey } // Exported in case it's needed outside

export const {
    useCreate: useCreateFeed,
    useUpdateById: useUpdateFeedById,

    useGetAll: useGetAllFeed,
    useGetById: useGetFeedById,
    useGetPaginated: useGetPaginatedFeed,

    useDeleteById: useDeleteFeedById,
    useDeleteMany: useDeleteManyFeed,
} = apiCrudHooks

// For like / unlike feed
export const useLikeFeed = createMutationFactory<
    void,
    Error,
    { feedId: TEntityId }
>({
    mutationFn: async ({ feedId }) => {
        const response = await FeedAPI.put<void, void>(
            `${feedAPIRoute}/${feedId}/like`
        )
        return response.data
    },
    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: [feedBaseKey],
        })
        args.queryClient.invalidateQueries({
            queryKey: [feedBaseKey, args.variables.feedId],
        })
    },
})

// For creating comment
export const useFeedCreateComment = createMutationFactory<
    IFeedComment,
    Error,
    { feedId: TEntityId; payload: IFeedCommentRequest }
>({
    mutationFn: async ({ feedId, payload }) => {
        const response = await FeedAPI.post<IFeedCommentRequest, IFeedComment>(
            `${feedAPIRoute}/${feedId}/comment`,
            payload
        )
        return response.data
    },
    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: [feedBaseKey],
        })
        args.queryClient.invalidateQueries({
            queryKey: [feedBaseKey, args.variables.feedId],
        })
    },
})

export const logger = Logger.getInstance('feed')
// custom hooks can go here
