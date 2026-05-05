import type z from 'zod'

import type { IAccountTransactionEntry } from '../account-transaction-entry/account-transaction-entry.types'
import type { IBaseEntityMeta, IPaginatedResult } from '@ecoop/shared/types'

import type { ACCOUNT_TRANSACTION_SOURCE } from './account-transaction-constants'
import type {
    AccountTransactionSchema,
    TAccountTransactionGenerateSchema,
} from './account-transaction.validation'

export type TAccountTransactionSource =
    (typeof ACCOUNT_TRANSACTION_SOURCE)[number]

export interface IAccountTransaction extends IBaseEntityMeta {
    source: TAccountTransactionSource

    jv_number: string
    date: string
    description: string

    debit: number
    credit: number

    entries: IAccountTransactionEntry[]
}

export type IAccountTransactionRequest = z.infer<
    typeof AccountTransactionSchema
>

export type IAccountTransactionGenerateRequest =
    TAccountTransactionGenerateSchema

export interface IAccountTransactionLedger {
    account_transaction_entry: IAccountTransactionEntry[]
    month: number
    debit: number
    credit: number
}

export type IAccountTransactionPaginated = IPaginatedResult<IAccountTransaction>
