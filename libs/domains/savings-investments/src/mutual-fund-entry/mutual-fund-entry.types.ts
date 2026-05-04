import type z from 'zod'

import type { IAccount } from '@ecoop/domains/accounting'
import type { IMemberProfile } from '@ecoop/domains/member-crm'
import type { IMutualFund } from '../mutual-fund/mutual-fund.types'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { MutualFundEntrySchema } from './mutual-fund-entry.validation'

export interface IMutualFundEntry extends IBaseEntityMeta {
    member_profile_id: TEntityId
    member_profile: IMemberProfile

    account_id: TEntityId
    account?: IAccount

    amount: number

    mutual_fund_id: TEntityId
    mutual_fund: IMutualFund
}

export type IMutualFundEntryRequest = z.infer<typeof MutualFundEntrySchema>

export type IMutualFundEntryPaginated = IPaginatedResult<IMutualFundEntry>
