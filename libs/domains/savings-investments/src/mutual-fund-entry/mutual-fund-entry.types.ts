import type z from 'zod'

import type { IAccount } from '@ecoop/modules/account'
import type { IMemberProfile } from '@ecoop/modules/member-profile'
import type { IMutualFund } from '@ecoop/modules/mutual-fund'
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
