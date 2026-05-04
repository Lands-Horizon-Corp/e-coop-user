import type { IBranch } from '@ecoop/domains/iam'
import type { IMemberProfile } from '../member-profile/member-profile.types'
import type { IMemberType } from '../member-type/member-type.types'
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
