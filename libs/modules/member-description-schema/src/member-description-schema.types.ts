import type { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import type {
    IAuditable,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

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
