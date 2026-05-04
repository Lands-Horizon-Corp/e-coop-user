import type z from 'zod'

import type { IUser } from '@ecoop/domains/iam'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { FeedLikeSchema } from './feed-like.validation'

export interface IFeedLike extends IBaseEntityMeta {
    feed_id: TEntityId
    user_id: TEntityId
    user?: IUser
}

export type IFeedLikeRequest = z.infer<typeof FeedLikeSchema>

export type IFeedLikePaginated = IPaginatedResult<IFeedLike>
