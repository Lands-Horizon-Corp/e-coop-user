import type z from 'zod'

import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

// import type { ILoanTransaction } from '@ecoop/domains/loans/models'
// import type { IMemberProfile } from '../member-profile/member-profile.types'
import type { ComakerMemberProfileSchema } from './comaker-member-profile.validation'

export interface IComakerMemberProfile<
    ILoanTransaction = unknown,
    IMemberProfile = unknown,
> extends IBaseEntityMeta {
    member_profile_id: TEntityId
    member_profile?: IMemberProfile
    loan_transaction_id: TEntityId
    loan_transaction?: ILoanTransaction
    description: string
    amount: number
    months_count: number
    year_count: number
}

export type IComakerMemberProfileRequest = z.infer<
    typeof ComakerMemberProfileSchema
>

export type IComakerMemberProfilePaginated =
    IPaginatedResult<IComakerMemberProfile>
