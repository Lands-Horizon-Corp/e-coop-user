import type z from 'zod'

import type { IAccount } from '../account/account.types'
import type { IPaginatedResult, TEntityId } from '@ecoop/shared/types'

import type { AccountHistorySchema } from './account-history.validation'

// export const HISTORY_CHANGE_TYPE = ['created', 'updated', 'deleted'] as const

// export type THistoryChangeType = (typeof HISTORY_CHANGE_TYPE)[number]

export interface IAccountHistory extends IAccount {
    account_id: TEntityId
    account: IAccount
    account_history_id: TEntityId
    // change_type: THistoryChangeType
}

export type IAccountHistoryRequest = z.infer<typeof AccountHistorySchema>

export type IAccountHistoryPaginated = IPaginatedResult<IAccountHistory>
