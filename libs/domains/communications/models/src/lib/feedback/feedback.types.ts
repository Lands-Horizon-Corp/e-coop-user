import type { IMedia } from '@ecoop/platforms/media/models'
import type { ITimeStamps, TEntityId } from '@ecoop/shared/types'

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
