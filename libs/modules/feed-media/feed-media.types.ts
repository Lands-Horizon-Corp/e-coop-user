import type z from 'zod'

import type { IMedia } from '@ecoop/modules/media'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { FeedMediaSchema } from './feed-media.validation'

export interface IFeedMedia extends IBaseEntityMeta {
    feed_id: TEntityId
    media_id: TEntityId
    media: IMedia
}

export type IFeedMediaRequest = z.infer<typeof FeedMediaSchema>

export type IFeedMediaPaginated = IPaginatedResult<IFeedMedia>
