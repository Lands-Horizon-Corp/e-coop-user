import type { IAccount } from '@ecoop/domains/accounting/models'
import type { TGeneralLedgerSource } from '@ecoop/domains/accounting/models'
import type { IUserBase } from '@ecoop/domains/iam/models'
import type { IMemberJointAccount } from '@ecoop/domains/member-crm/models'
import type { IMemberProfile } from '@ecoop/domains/member-crm/models'
import type { ICurrency } from '@ecoop/platforms/currency'
import type { IMedia } from '@ecoop/platforms/media/models'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { IPaymentRequest } from '../quick-transfer/quick-transfer.types'
import type { ITransactionBatch } from '../transaction-batch/transaction-batch.types'
import type { TTransactionSchema } from './transaction.validation'

export interface ITransactionRequest {
    signature_media_id?: TEntityId

    member_profile_id?: TEntityId
    member_joint_account_id?: TEntityId

    is_reference_number_checked?: boolean
    reference_number?: string
    source?: TGeneralLedgerSource
    description?: string

    currency_id: TEntityId
}

export interface ITransaction extends IBaseEntityMeta {
    amount: number
    source: TGeneralLedgerSource
    description: string

    acccount_id: TEntityId
    account: IAccount
    signature_media_id: TEntityId
    signature_media: IMedia | null

    transaction_batch_id: TEntityId
    transaction_batch: ITransactionBatch | null

    employee_user_id: TEntityId
    employee_user: IUserBase | null

    member_profile_id: TEntityId
    member_profile: IMemberProfile | null

    member_joint_account_id: TEntityId
    member_joint_account: IMemberJointAccount | null

    currency_id: TEntityId
    currency: ICurrency

    loan_balance: number
    loan_due: number
    total_due: number
    fines_due: number
    total_loan: number
    interest_due: number
    reference_number: string
}

export type ITransactionPaginated = IPaginatedResult<ITransaction>

export type TUpdateReferenceNumberProps = {
    transactionId: string
    reference_number: string
    description: string
}

export type TCreateTransactionPaymentProps = {
    data: IPaymentRequest
    transactionId: string
}

export type TTransactionRequest = TTransactionSchema
