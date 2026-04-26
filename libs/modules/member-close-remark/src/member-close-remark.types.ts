import {
    IAuditable,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import { ACCOUNT_CLOSURE_REASONS } from './member-close-remark.constants'

export type TAccountClosureReasonType = (typeof ACCOUNT_CLOSURE_REASONS)[number]

// LATEST FROM ERD
export interface IMemberCloseRemarkRequest {
    id?: TEntityId
    member_profile_id: TEntityId

    reason: TAccountClosureReasonType
    description: string
}

// LATEST FROM ERD
export interface IMemberCloseRemark extends ITimeStamps, IAuditable {
    id: TEntityId
    member_profile_id: TEntityId
    member_profile: IMemberProfile

    reason: TAccountClosureReasonType
    description: string
}
