import { IAccount } from '@e-coop-monorepo/modules/account'
import { IGeneratedSavingsInterestEntry } from '@e-coop-monorepo/modules/generated-savings-interest-entry'
import { IMemberType } from '@e-coop-monorepo/modules/member-type'
import { IUserBase } from '@e-coop-monorepo/modules/user'
import {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { GENERATED_INTEREST_SAVINGS_COMPUTATION_TYPES } from './generated-savings-interest.constant'
import {
    TGeneratedSavingsInterestPostSchema,
    TGeneratedSavingsInterestPrintSchema,
    TGeneratedSavingsInterestSchema,
} from './generated-savings-interest.validation'

export type TSavingsComputationType =
    (typeof GENERATED_INTEREST_SAVINGS_COMPUTATION_TYPES)[number]

export interface IGeneratedSavingsInterest extends IBaseEntityMeta {
    document_no: string

    account_id?: TEntityId
    account?: IAccount

    member_type_id?: TEntityId
    member_type?: IMemberType

    last_computation_date: string
    new_computation_date: string

    savings_computation_type: TSavingsComputationType
    include_closed_account: boolean
    include_existing_computed_interest: boolean
    interest_tax_rate: number
    total_interest: number
    total_tax: number

    printed_by_user_id?: TEntityId
    printed_by_user?: IUserBase
    printed_date?: string
    posted_by_user_id?: TEntityId
    posted_by_user?: IUserBase
    posted_date?: string
    check_voucher_number?: string

    post_account_id?: TEntityId
    post_account?: IAccount

    entries?: IGeneratedSavingsInterestEntry[]
}

export type IGeneratedSavingsInterestRequest = TGeneratedSavingsInterestSchema

export type IGenerateSavingsInterestPostRequest =
    TGeneratedSavingsInterestPostSchema

export interface IGeneratedSavingsInterestView {
    entries?: IGeneratedSavingsInterestEntry[]
    total_tax: number
    total_interest: number
}

export type IGeneratedSavingsInterestPrintRequest =
    TGeneratedSavingsInterestPrintSchema

export type IGeneratedSavingsInterestPaginated =
    IPaginatedResult<IGeneratedSavingsInterest>
