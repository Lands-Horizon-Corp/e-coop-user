import z from 'zod'

import {
    IBaseEntityMeta,
    IPaginatedResult,
} from '@e-coop-monorepo/shared/types'

import { LoanTagSchema } from './loan-tag.validation'

export interface ILoanTag extends IBaseEntityMeta {
    name: string
    description: string
    color: string
    icon: string
}

export type ILoanTagRequest = z.infer<typeof LoanTagSchema>

export type ILoanTagPaginated = IPaginatedResult<ILoanTag>
