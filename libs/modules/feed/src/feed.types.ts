import z from 'zod'

import { IFeedComment } from '@e-coop-monorepo/modules/feed-comment'
import { IFeedLike } from '@e-coop-monorepo/modules/feed-like'
import { IFeedMedia } from '@e-coop-monorepo/modules/feed-media'
import {
    IBaseEntityMeta,
    IPaginatedResult,
} from '@e-coop-monorepo/shared/types'

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
