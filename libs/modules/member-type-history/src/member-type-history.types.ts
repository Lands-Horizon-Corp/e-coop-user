import { IBranch } from '@e-coop-monorepo/modules/branch'
import { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import { IMemberType } from '@e-coop-monorepo/modules/member-type'
import {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

// FROM LATEST ERD
export interface IMemberTypeHistory extends ITimeStamps, IAuditable {
    id: TEntityId

    branch_id: TEntityId
    branch: IBranch

    member_type_id: TEntityId
    member_type: IMemberType

    member_profile_id: TEntityId
    member_profile: IMemberProfile
}

export type IMemberTypeHistoryPaginated = IPaginatedResult<IMemberTypeHistory>
