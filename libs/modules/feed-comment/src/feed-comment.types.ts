import z from 'zod'

import {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { IMedia } from '@e-coop-monorepo/modules/media'
import { IUser } from '@e-coop-monorepo/modules/user'
import { FeedCommentSchema } from './feed-comment.validation'

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
