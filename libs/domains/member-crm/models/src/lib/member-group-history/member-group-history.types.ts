import type { IMemberGroup } from '../member-group/member-group.types'
import type { IMemberProfile } from '../member-profile/member-profile.types'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

export interface IMemberGroupHistoryRequest {
    member_profile_id: TEntityId
    member_group_id: TEntityId
}

export interface IMemberGroupHistory extends IBaseEntityMeta {
    id: TEntityId
    member_profile_id: TEntityId
    member_profile?: IMemberProfile
    member_group_id: TEntityId
    member_group?: IMemberGroup
}

export type IMemberGroupHistoryPaginated = IPaginatedResult<IMemberGroupHistory>
