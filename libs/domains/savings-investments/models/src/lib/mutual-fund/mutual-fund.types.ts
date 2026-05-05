import type z from 'zod'

import type { IAccount } from '@ecoop/domains/accounting/models'
import type { IMemberProfile } from '@ecoop/domains/member-crm/models'
import type { IMutualFundAdditionalMembers } from '../mutual-fund-additional-members/mutual-fund-additional-members.types'
import type { IMutualFundEntry } from '../mutual-fund-entry/mutual-fund-entry.types'
import type { IMutualFundTable } from '../mutual-fund-table/mutual-fund-table.types'
import type { IUser } from '@ecoop/domains/iam/models'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { MUTUAL_FUND_COMPUTATION_TYPES } from './mutual-fund.constant'
import type {
    MutualFundSchema,
    MutualFundViewSchema,
    TMutualFundPrintSchema,
    TMutualFundViewPostRequestSchema,
} from './mutual-fund.validation'

export type TMutualFundComputationType =
    (typeof MUTUAL_FUND_COMPUTATION_TYPES)[number]

export interface IMutualFund extends IBaseEntityMeta {
    member_profile_id: TEntityId
    member_profile?: IMemberProfile
    mutual_fund_table_id?: TEntityId

    account: IAccount
    account_id: TEntityId

    mutual_fund_table?: IMutualFundTable
    additional_members?: IMutualFundAdditionalMembers[]

    name: string
    description: string
    date_of_death: string
    extension_only: boolean
    amount: number
    computation_type: TMutualFundComputationType

    entries?: IMutualFundEntry[]

    // Printing fields
    printed_by_user_id?: TEntityId
    printed_by_user?: IUser
    printed_date?: string

    // Posting fields
    posted_date?: string
    post_account_id?: TEntityId
    post_account?: IAccount
    posted_by_user_id?: TEntityId
    posted_by_user?: IUser
}

export type IMutualFundRequest = z.infer<typeof MutualFundSchema>

export type IMutualFundViewRequest = z.infer<typeof MutualFundViewSchema>

export interface IMutualFundView {
    mutual_fund: IMutualFund

    mutual_fund_entries?: IMutualFundEntry[]
    total_amount: number
}

export type IMutualFundPostRequest = TMutualFundViewPostRequestSchema

export type IMutualFundPrintRequest = TMutualFundPrintSchema

export type IMutualFundPaginated = IPaginatedResult<IMutualFund>
