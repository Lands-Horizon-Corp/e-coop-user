import type z from 'zod'

import type {
    IBaseEntityMeta,
    IPaginatedResult,
} from '@e-coop-monorepo/shared/types'

import type { LoanPurposeSchema } from './loan-purpose.validation'

export interface ILoanPurpose extends IBaseEntityMeta {
    description: string
    icon: string
}

export type ILoanPurposeRequest = z.infer<typeof LoanPurposeSchema>

export type ILoanPurposePaginated = IPaginatedResult<ILoanPurpose>
