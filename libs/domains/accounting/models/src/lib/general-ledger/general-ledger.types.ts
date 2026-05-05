import type { IAccount } from '../account/account.types'
import type { IBank } from '@ecoop/platforms/bank'
import type { ICurrency } from '@ecoop/platforms/currency'
import type { IMedia } from '@ecoop/platforms/media'
import type { IMemberJointAccount } from '@ecoop/domains/member-crm/models'
import type { IMemberProfile } from '@ecoop/domains/member-crm/models'
import type { IPaymentType } from '@ecoop/domains/transactions/models'
import type { ITransaction } from '@ecoop/domains/transactions/models'
import type { ITransactionBatch } from '@ecoop/domains/transactions/models'
import type { IUserBase } from '@ecoop/domains/iam/models'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type {
    GENERAL_LEDGER_SOURCES,
    GENERAL_LEDGER_TYPE,
} from './general-ledger.constants'

export type TEntryType =
    | ''
    | 'check-entry'
    | 'online-entry'
    | 'cash-entry'
    | 'payment-entry'
    | 'withdraw-entry'
    | 'deposit-entry'
    | 'journal-entry'
    | 'adjustment-entry'
    | 'journal-voucher'
    | 'check-voucher'

export type TGeneralLedgerSource = (typeof GENERAL_LEDGER_SOURCES)[number]

export type TGeneralLedgerType = (typeof GENERAL_LEDGER_TYPE)[number]

export interface IGeneralLedger extends IBaseEntityMeta {
    account_id: TEntityId
    account: IAccount
    account_history_id: TEntityId

    transaction_id: TEntityId
    transaction: ITransaction | null

    transaction_batch_id: TEntityId
    transaction_batch: ITransactionBatch | null

    employee_user_id: TEntityId
    employee_user: IUserBase | null

    member_profile_id: TEntityId
    member_profile: IMemberProfile | null

    member_joint_account_id: TEntityId
    member_joint_account: IMemberJointAccount | null

    payment_type_id: TEntityId
    payment_type: IPaymentType | null

    signature_media_id: TEntityId
    signature_media: IMedia | null

    bank_id: TEntityId
    bank: IBank | null

    proof_of_payment_media_id: TEntityId | null
    proof_of_payment_media: IMedia | null

    transaction_reference_number: string
    reference_number: string

    source: TGeneralLedgerSource
    journal_voucher_id: TEntityId
    adjustment_entry_id: TEntityId

    // adjustment_entry:  | null

    type_of_payment_type: string
    credit: number
    debit: number
    balance: number

    // FOR CURRENCY
    currency_id: TEntityId
    currency: ICurrency

    entry_date: string
    bank_reference_number: string
    description: string
    print_number?: number
}

export interface IMemberGeneralLedgerTotal {
    total_debit: number
    total_credit: number
    balance: number
}

export type IGeneralLedgerPaginated = IPaginatedResult<IGeneralLedger>
