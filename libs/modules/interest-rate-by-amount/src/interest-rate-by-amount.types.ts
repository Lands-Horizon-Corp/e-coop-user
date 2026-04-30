import type z from 'zod'

import type {
    IBaseEntityMeta,
    IPaginatedResult,
} from '@e-coop-monorepo/shared/types'

import type { InterestRateByAmountSchema } from './interest-rate-by-amount.validation'

export interface IInterestRateByAmount extends IBaseEntityMeta {
    from_amount: number
    to_amount: number
    interest_rate: number
}

export type IInterestRateByAmountRequest = z.infer<
    typeof InterestRateByAmountSchema
>

export type IInterestRateByAmountPaginated =
    IPaginatedResult<IInterestRateByAmount>
