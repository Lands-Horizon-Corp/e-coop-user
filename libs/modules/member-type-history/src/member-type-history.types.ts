import type { IBranch } from '@ecoop/modules/branch'
import type { IMemberProfile } from '@ecoop/modules/member-profile'
import type { IMemberType } from '@ecoop/modules/member-type'
import type {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

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
