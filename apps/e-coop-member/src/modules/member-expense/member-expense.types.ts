import type z from 'zod'

import type { IBranch } from '@ecoop/domains/iam'
import type { IMemberProfile } from '@ecoop/domains/member-crm'
import type { IBaseEntityMeta, TEntityId } from '@ecoop/shared/types'

import type { MemberExpenseSchema } from './member-expense.validation'

// LATEST FROM ERD
export type IMemberExpenseRequest = z.infer<typeof MemberExpenseSchema>

// LATEST FROM ERD
export interface IMemberExpense extends IBaseEntityMeta {
    id: TEntityId
    member_profile_id: TEntityId
    member_profile: IMemberProfile

    branch_id: TEntityId
    branch: IBranch

    name: string
    amount: number
    description: string
}
