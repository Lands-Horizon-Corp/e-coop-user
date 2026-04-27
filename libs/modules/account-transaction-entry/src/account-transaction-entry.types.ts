import z from 'zod'

import { IAccount } from '@e-coop-monorepo/modules/account'
import { IAccountTransaction } from '@e-coop-monorepo/modules/account-transaction'
import {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { AccountTransactionEntrySchema } from './account-transaction-entry.validation'

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
