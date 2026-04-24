import z from 'zod'

import {
    IBaseEntityMeta,
    IPaginatedResult,
} from '@e-coop-monorepo/shared/types'

import { IFeedComment } from '../feed-comment'
import { IFeedLike } from '../feed-like'
import { IFeedMedia } from '../feed-media'
import { FeedSchema } from './feed.validation'

export interface IFeed extends IBaseEntityMeta {
    description: string
    feed_medias?: IFeedMedia[]
    feed_comments?: IFeedComment[]
    user_likes?: IFeedLike[]
    is_liked: boolean
}

export type IFeedRequest = z.infer<typeof FeedSchema>

export type IFeedPaginated = IPaginatedResult<IFeed>
