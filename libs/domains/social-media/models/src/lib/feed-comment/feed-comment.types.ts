import type z from 'zod'

import type { IUser } from '@ecoop/domains/iam/models'
import type { IMedia } from '@ecoop/platforms/media/models'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { FeedCommentSchema } from './feed-comment.validation'

export interface IFeedComment extends IBaseEntityMeta {
    feed_id: TEntityId
    user_id: TEntityId
    user: IUser
    comment: string
    media_id?: TEntityId
    media?: IMedia
}

export type IFeedCommentRequest = z.infer<typeof FeedCommentSchema>

export type IFeedCommentPaginated = IPaginatedResult<IFeedComment>
