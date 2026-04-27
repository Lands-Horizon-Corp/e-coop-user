import { IAccount } from '@e-coop-monorepo/modules/account'
import { ICurrency } from '@e-coop-monorepo/modules/currency'
import { TGeneralLedgerSource } from '@e-coop-monorepo/modules/general-ledger'
import { IMedia } from '@e-coop-monorepo/modules/media'
import { IMemberJointAccount } from '@e-coop-monorepo/modules/member-joint-account'
import { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import { IPaymentRequest } from '@e-coop-monorepo/modules/quick-transfer'
import { ITransactionBatch } from '@e-coop-monorepo/modules/transaction-batch'
import { IUserBase } from '@e-coop-monorepo/modules/user'
import {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { TTransactionSchema } from './transaction.validation'

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
