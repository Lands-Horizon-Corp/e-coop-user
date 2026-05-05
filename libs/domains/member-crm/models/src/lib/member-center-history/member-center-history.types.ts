import type { IBranch } from '@ecoop/domains/iam/models'
import type { IMemberCenter } from '../member-center/member-center.types'
import type { IMemberProfile } from '../member-profile/member-profile.types'
import type {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

export interface IMemberCenterHistory extends ITimeStamps, IAuditable {
    id: TEntityId

    member_center_id: TEntityId
    member_center: IMemberCenter

    member_profile_id: TEntityId
    member_profile: IMemberProfile

    branch_id: TEntityId
    branch: IBranch
}

export type IMemberCenterHistoryPaginated =
    IPaginatedResult<IMemberCenterHistory>
