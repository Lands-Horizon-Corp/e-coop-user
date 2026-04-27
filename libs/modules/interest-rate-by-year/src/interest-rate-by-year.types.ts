import z from 'zod'

import { IBrowseReference } from '@e-coop-monorepo/modules/browse-reference'
import {
    IBaseEntityMeta,
    IPaginatedResult,
} from '@e-coop-monorepo/shared/types'

import { InterestRateByYearSchema } from './interest-rate-by-year.validation'

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
