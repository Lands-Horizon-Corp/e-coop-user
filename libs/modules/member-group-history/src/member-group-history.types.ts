import { IMemberGroup } from '@e-coop-monorepo/modules/member-group'
import { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

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
