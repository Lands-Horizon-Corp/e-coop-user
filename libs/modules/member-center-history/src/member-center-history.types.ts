import type { IBranch } from '@e-coop-monorepo/modules/branch'
import type { IMemberCenter } from '@e-coop-monorepo/modules/member-center'
import type { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import type {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

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
