import {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { IBranch } from '@e-coop-monorepo/modules/branch'
import { IMemberCenter } from '@e-coop-monorepo/modules/member-center'
import { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'

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
