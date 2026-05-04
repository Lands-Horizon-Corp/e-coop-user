import type z from 'zod'

import type { IFeedComment } from '../feed-comment/feed-comment.types'
import type { IFeedLike } from '../feed-like/feed-like.types'
import type { IFeedMedia } from '../feed-media/feed-media.types'
import type { IBaseEntityMeta, IPaginatedResult } from '@ecoop/shared/types'

import type { FeedSchema } from './feed.validation'

export interface IFeed extends IBaseEntityMeta {
    description: string
    feed_medias?: IFeedMedia[]
    feed_comments?: IFeedComment[]
    user_likes?: IFeedLike[]
    is_liked: boolean
}

export type IFeedRequest = z.infer<typeof FeedSchema>

export type IFeedPaginated = IPaginatedResult<IFeed>
