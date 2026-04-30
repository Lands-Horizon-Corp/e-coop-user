import type z from 'zod'

import type { IBrowseReference } from '@e-coop-monorepo/modules/browse-reference'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import type { InterestRateByDateSchema } from './interest-rate-by-date.validation'

export interface IInterestRateByDate extends IBaseEntityMeta {
    browse_reference_id: TEntityId
    browse_reference: IBrowseReference

    from_date: string
    to_date: string
    interest_rate: number
}

export type IInterestRateByDateRequest = z.infer<
    typeof InterestRateByDateSchema
>

export type IInterestRateByDatePaginated = IPaginatedResult<IInterestRateByDate>
