import type { IMedia } from '@e-coop-monorepo/modules/media'
import type { ITimeStamps, TEntityId } from '@e-coop-monorepo/shared/types'

export interface IFeedbackRequest {
    id?: TEntityId | null
    email: string
    description: string
    feedback_type: 'general' | 'bug' | 'feature'
    media_id?: TEntityId | null
}

export interface IFeedback extends ITimeStamps {
    id: TEntityId
    email: string
    description: string
    feedback_type: 'general' | 'bug' | 'feature'
    media_id?: TEntityId
    media?: IMedia
}
