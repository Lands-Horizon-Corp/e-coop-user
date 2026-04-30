import type z from 'zod'

import type { ILoanTransaction } from '@e-coop-monorepo/modules/loan-transaction'
import type { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import type { ComakerMemberProfileSchema } from './comaker-member-profile.validation'

export interface IComakerMemberProfile extends IBaseEntityMeta {
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
