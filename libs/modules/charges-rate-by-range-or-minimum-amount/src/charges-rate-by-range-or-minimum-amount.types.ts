import z from 'zod'

import {
    IBaseEntityMeta,
    IPaginatedResult,
} from '@e-coop-monorepo/shared/types'

import { IChargesRateScheme } from '@e-coop-monorepo/modules/charges-rate-scheme'
import { ChargesRateByRangeOrMinimumAmountSchema } from './charges-rate-by-range-or-minimum-amount.validation'

export interface IChargesRateByRangeOrMinimumAmount extends IBaseEntityMeta {
    charges_rate_scheme_id: string
    charges_rate_scheme?: IChargesRateScheme
    from: number
    to: number
    charge: number
    amount: number
    minimum_amount: number
}

export type IChargesRateByRangeOrMinimumAmountRequest = z.infer<
    typeof ChargesRateByRangeOrMinimumAmountSchema
>

export type IChargesRateByRangeOrMinimumAmountPaginated =
    IPaginatedResult<IChargesRateByRangeOrMinimumAmount>
