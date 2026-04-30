import type z from 'zod'

import type { IFeedComment } from '@e-coop-monorepo/modules/feed-comment'
import type { IFeedLike } from '@e-coop-monorepo/modules/feed-like'
import type { IFeedMedia } from '@e-coop-monorepo/modules/feed-media'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
} from '@e-coop-monorepo/shared/types'

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
