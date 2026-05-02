import type z from 'zod'

import type { IBrowseReference } from '@ecoop/modules/browse-reference'
import type { IBaseEntityMeta, IPaginatedResult } from '@ecoop/shared/types'

import type { InterestRateByYearSchema } from './interest-rate-by-year.validation'

export interface IInterestRateByYear extends IBaseEntityMeta {
    browse_reference_id: string
    browse_reference?: IBrowseReference

    from_year: number
    to_year: number
    interest_rate: number
}

export type IInterestRateByYearRequest = z.infer<
    typeof InterestRateByYearSchema
>

export type IInterestRateByYearPaginated = IPaginatedResult<IInterestRateByYear>
