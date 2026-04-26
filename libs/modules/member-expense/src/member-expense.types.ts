import z from 'zod'

import { IBaseEntityMeta, TEntityId } from '@e-coop-monorepo/shared/types'

import { IBranch } from '@e-coop-monorepo/modules/branch'
import { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import { MemberExpenseSchema } from './member-expense.validation'

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
