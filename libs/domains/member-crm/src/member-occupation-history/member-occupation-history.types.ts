import type { IMemberOccupation } from '../member-occupation/member-occupation.types'
import type { IMemberProfile } from '../member-profile/member-profile.types'
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
