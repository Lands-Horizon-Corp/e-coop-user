import type z from 'zod'

import type { IBaseEntityMeta, IPaginatedResult } from '@ecoop/shared/types'

import type { LoanTagSchema } from './loan-tag.validation'

export interface ILoanTag extends IBaseEntityMeta {
    name: string
    description: string
    color: string
    icon: string
}

export type ILoanTagRequest = z.infer<typeof LoanTagSchema>

export type ILoanTagPaginated = IPaginatedResult<ILoanTag>
