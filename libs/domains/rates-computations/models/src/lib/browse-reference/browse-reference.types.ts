import type { IAccount } from '@ecoop/domains/accounting/models'
import type { IInterestRateByAmount } from '../interest-rate-by-amount/interest-rate-by-amount.types'
import type { IInterestRateByDate } from '../interest-rate-by-date/interest-rate-by-date.types'
import type { IInterestRateByYear } from '../interest-rate-by-year/interest-rate-by-year.types'
import type { IMemberType } from '@ecoop/domains/member-crm/models'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { INTEREST_TYPE } from './browse-reference.constants'
import type { TBrowseReferenceSchema } from './browse-reference.validation'

export type TInterestType = (typeof INTEREST_TYPE)[number]

// LATEST FROM ERD
export type IBrowseReferenceRequest = TBrowseReferenceSchema

// LATEST FROM ERD
export interface IBrowseReference extends IBaseEntityMeta {
    id: TEntityId

    name: string

    account_id: TEntityId
    account: IAccount

    member_type_id: TEntityId
    member_type: IMemberType

    description: string
    minimum_balance: number
    interest_rate: number
    charges: number

    interest_type: TInterestType

    other_interest_on_saving_computation_minimum_balance?: number
    other_interest_on_saving_computation_interest_rate?: number

    interest_rates_by_year: IInterestRateByYear[]
    interest_rates_by_date: IInterestRateByDate[]
    interest_rates_by_amount: IInterestRateByAmount[]
}

export type IBrowseReferencePaginated = IPaginatedResult<IBrowseReference>
