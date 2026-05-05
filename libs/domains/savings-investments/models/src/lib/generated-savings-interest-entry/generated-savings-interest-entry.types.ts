import type { IAccount } from '@ecoop/domains/accounting/models'
import type { IGeneratedSavingsInterest } from '../generated-savings-interest/generated-savings-interest.types'
import type { IMemberProfile } from '@ecoop/domains/member-crm/models'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { TGeneratedSavingsInterestEntrySchema } from './generated-savings-interest-entry.validation'

export interface IGeneratedSavingsInterestEntry extends IBaseEntityMeta {
    generated_savings_interest_id: TEntityId
    generated_savings_interest?: IGeneratedSavingsInterest

    account_id: TEntityId
    account?: IAccount

    member_profile_id: TEntityId
    member_profile?: IMemberProfile

    interest_amount: number
    interest_tax: number
    ending_balance: number
}

export type IGeneratedSavingsInterestEntryRequest =
    TGeneratedSavingsInterestEntrySchema

// FOR DAILY VIEW
export type TBalanceMovement = 'increase' | 'decrease' | 'no_change'

export interface IGeneratedSavingsInterestEntryDailyBalance {
    balance: number
    date: string
    type: TBalanceMovement // "increase", "decrease", "no_change"
}

export interface IGeneratedSavingsInterestEntryDailyBalanceView {
    beginning_balance: number
    ending_balance: number
    average_daily_balance: number
    lowest_balance: number
    highest_balance: number
    daily_balance: IGeneratedSavingsInterestEntryDailyBalance[]
    account?: IAccount
    member_profile?: IMemberProfile
}

export type IGeneratedSavingsInterestEntryPaginated =
    IPaginatedResult<IGeneratedSavingsInterestEntry>
