import type z from 'zod'

import type { IChargesRateScheme } from '@ecoop/modules/charges-rate-scheme'
import type { IBaseEntityMeta, IPaginatedResult } from '@ecoop/shared/types'

import type { ChargesRateByRangeOrMinimumAmountSchema } from './charges-rate-by-range-or-minimum-amount.validation'

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
