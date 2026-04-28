import { IAccount } from '@e-coop-monorepo/modules/account'
import { ILoanTransaction } from '@e-coop-monorepo/modules/loan-transaction'
import { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { LOAN_TRANSACTION_ENTRY_TYPE } from './loan-transaction-constant'
import { TLoanTransactionEntrySchema } from './loan-transaction-entry.validation'

export type TLoanTransactionEntryType =
    (typeof LOAN_TRANSACTION_ENTRY_TYPE)[number]

export interface ILoanTransactionEntry extends IBaseEntityMeta {
    loan_transaction_id: TEntityId
    loan_transaction?: ILoanTransaction

    index?: number

    account_id?: TEntityId
    account?: IAccount

    name: string // incase madelete yung account, nakasurvive yung name
    description: string

    member_profile_id?: TEntityId
    member_profile?: IMemberProfile

    member_loan_transaction_id?: TEntityId
    member_loan_transaction?: ILoanTransaction

    credit: number
    debit: number

    amount: number

    is_add_on: boolean //
    is_automatic_loan_deduction_deleted: boolean
    type: TLoanTransactionEntryType //
}

export type ILoanTransactionEntryRequest = TLoanTransactionEntrySchema

export type ILoanTransactionEntryPaginated =
    IPaginatedResult<ILoanTransactionEntry>
