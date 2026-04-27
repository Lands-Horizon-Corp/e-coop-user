import z from 'zod'

import { IAccount } from '@e-coop-monorepo/modules/account'
import { IPaginatedResult, TEntityId } from '@e-coop-monorepo/shared/types'

import { AccountHistorySchema } from './account-history.validation'

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
