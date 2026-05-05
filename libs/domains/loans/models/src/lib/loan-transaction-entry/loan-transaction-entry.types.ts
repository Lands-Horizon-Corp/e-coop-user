import type { IAccount } from '@ecoop/domains/accounting'
import type { ILoanTransaction } from '../loan-transaction/loan-transaction.types'
import type { IMemberProfile } from '@ecoop/domains/member-crm'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { LOAN_TRANSACTION_ENTRY_TYPE } from './loan-transaction-constant'
import type { TLoanTransactionEntrySchema } from './loan-transaction-entry.validation'

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
