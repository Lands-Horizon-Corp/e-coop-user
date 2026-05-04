import type { IMemberProfile } from '../member-profile/member-profile.types'
import type { IAuditable, ITimeStamps, TEntityId } from '@ecoop/shared/types'

export interface IMemberDescriptionRequest {
    id?: TEntityId
    name: string
    description: string
}

export interface IMemberDescription extends ITimeStamps, IAuditable {
    id: TEntityId
    member_profile_id: TEntityId
    member_profile: IMemberProfile

    date: string
    description: string
    name: string
}
