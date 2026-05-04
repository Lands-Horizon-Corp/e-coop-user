import type z from 'zod'

import type { IAccount } from '../account/account.types'
import type { IAccountTransaction } from '../account-transaction/account-transaction.types'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { AccountTransactionEntrySchema } from './account-transaction-entry.validation'

export interface IAccountTransactionEntry extends IBaseEntityMeta {
    account_transaction_id: TEntityId
    account_transaction: IAccountTransaction

    account_id: TEntityId
    account: IAccount

    jv_number: string

    date: string

    debit: number
    credit: number

    balance: number
}

export type IAccountTransactionEntryRequest = z.infer<
    typeof AccountTransactionEntrySchema
>

export type IAccountTransactionEntryPaginated =
    IPaginatedResult<IAccountTransactionEntry>
