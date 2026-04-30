import { feedBaseKey } from '@e-coop-monorepo/modules/feed'
import { Logger } from '@e-coop-monorepo/shared/helpers'
from '@e-coop-monorepo/shared/repositories'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/repositories'
import type { TEntityId } from '@e-coop-monorepo/shared/types'

import type { IFeedComment, IFeedCommentRequest } from '../feed-comment'

const {
    // apiCrudHooks,
    apiCrudService,
    baseQueryKey: feedCommentBaseKey,
} = createDataLayerFactory<IFeedComment, IFeedCommentRequest>({
    url: '/api/v1/feed-comment',
    baseKey: 'feed-comment',
})

// ⚙️🛠️ API SERVICE HERE
export const { deleteById: deleteFeedCommentById } = apiCrudService

// custom service functions can go here

// 🪝 HOOK STARTS HERE
export { feedCommentBaseKey } // Exported in case it's needed outside
// export const { useDeleteById: useDeleteFeedCommentById } = apiCrudHooks

export const useDeleteFeedCommentById = createMutationFactory<
    void,
    Error,
    TEntityId
>({
    mutationFn: (id) => deleteFeedCommentById({ id }),
    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: [feedBaseKey],
        })
        deleteMutationInvalidationFn(feedCommentBaseKey, args)
    },
})

export const logger = Logger.getInstance('feed-comment')
// custom hooks can go here
