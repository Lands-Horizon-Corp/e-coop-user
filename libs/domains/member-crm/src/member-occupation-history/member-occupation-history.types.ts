import type { IMemberOccupation } from '@ecoop/modules/member-occupation'
import type { IMemberProfile } from '@ecoop/modules/member-profile'
import type {
    IAuditable,
    IOrgBranchIdentity,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

export interface IMemberOccupationHistoryRequest {
    member_profile_id: TEntityId
    member_occupation_id: TEntityId
}

export interface IMemberOccupationHistory
    extends ITimeStamps, IAuditable, IOrgBranchIdentity {
    id: TEntityId
    member_profile_id: TEntityId
    member_profile?: IMemberProfile
    member_occupation_id: TEntityId
    member_occupation?: IMemberOccupation
}

export type IMemberOccupationHistoryPaginated =
    IPaginatedResult<IMemberOccupationHistory>
