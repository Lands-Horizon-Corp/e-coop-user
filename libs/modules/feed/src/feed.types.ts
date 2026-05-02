import type z from 'zod'

import type { IFeedComment } from '@ecoop/modules/feed-comment'
import type { IFeedLike } from '@ecoop/modules/feed-like'
import type { IFeedMedia } from '@ecoop/modules/feed-media'
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
