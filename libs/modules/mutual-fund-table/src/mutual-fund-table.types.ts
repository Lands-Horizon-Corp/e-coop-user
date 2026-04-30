import type z from 'zod'

import type {
    IBaseEntityMeta,
    IPaginatedResult,
} from '@e-coop-monorepo/shared/types'

import type { MutualFundTableSchema } from './mutual-fund-table.validation'

export interface IMutualFundTable extends IBaseEntityMeta {
    months_from: number
    months_to: number
    amount: number
}

export type IMutualFundTableRequest = z.infer<typeof MutualFundTableSchema>

export type IMutualFundTablePaginated = IPaginatedResult<IMutualFundTable>
