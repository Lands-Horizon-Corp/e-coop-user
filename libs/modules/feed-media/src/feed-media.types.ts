import z from 'zod'

import { IMedia } from '@e-coop-monorepo/modules/media'
import {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { FeedMediaSchema } from './feed-media.validation'

export interface IFeedMedia extends IBaseEntityMeta {
    feed_id: TEntityId
    media_id: TEntityId
    media: IMedia
}

export type IFeedMediaRequest = z.infer<typeof FeedMediaSchema>

export type IFeedMediaPaginated = IPaginatedResult<IFeedMedia>
