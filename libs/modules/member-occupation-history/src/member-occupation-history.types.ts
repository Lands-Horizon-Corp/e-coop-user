import {
    IAuditable,
    IOrgBranchIdentity,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { IMemberOccupation } from '@e-coop-monorepo/modules/member-occupation'
import { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'

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
