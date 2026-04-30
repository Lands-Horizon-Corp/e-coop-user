import type z from 'zod'

import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import type { FinancialStatementTitleSchema } from './financial-statement-title.validation'

export interface IFinancialStatementTitle extends IBaseEntityMeta {
    id: TEntityId
    title: string

    total_title: string
    exclude_consolidate_total: boolean

    index: number
    color: string
}

export type IFinancialStatementTitleRequest = z.infer<
    typeof FinancialStatementTitleSchema
>

export type IFinancialStatementTitlePaginated =
    IPaginatedResult<IFinancialStatementTitle>
