import { ReactNode } from 'react'

import { IMedia } from '@e-coop-monorepo/modules/media'
import { ITimeStamps, TEntityId } from '@e-coop-monorepo/shared/types'

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

export type TSoftwareUpdateEntryStatus = 'general' | 'bug' | 'feature'

export interface SoftwareUpdates {
    name: string
    version: string
    description: string
    date: Date
    updates: SoftwareUpdateEntry[]
}

export interface SoftwareUpdateEntry {
    text: string
    updateStatus: TSoftwareUpdateEntryStatus
    Icon?: ReactNode
}
