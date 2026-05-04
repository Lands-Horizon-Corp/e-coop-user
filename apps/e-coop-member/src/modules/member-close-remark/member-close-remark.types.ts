import type { IMemberProfile } from '@ecoop/domains/member-crm'
import type { IAuditable, ITimeStamps, TEntityId } from '@ecoop/shared/types'

import type { ACCOUNT_CLOSURE_REASONS } from './member-close-remark.constants'

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
