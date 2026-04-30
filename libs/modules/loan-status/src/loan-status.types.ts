import type z from 'zod'

import type {
    IBaseEntityMeta,
    IPaginatedResult,
} from '@e-coop-monorepo/shared/types'

import type { LoanStatusSchema } from './loan-status.validation'

export interface ILoanStatus extends IBaseEntityMeta {
    name: string
    icon: string
    color: string
    description: string
}

export type ILoanStatusRequest = z.infer<typeof LoanStatusSchema>

export type ILoanStatusPaginated = IPaginatedResult<ILoanStatus>
