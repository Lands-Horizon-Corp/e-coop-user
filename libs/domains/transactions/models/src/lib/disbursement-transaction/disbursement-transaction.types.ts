import type { IDisbursement } from '../disbursement/disbursement.types'
import type { ITransactionBatch } from '../transaction-batch/transaction-batch.types'
import type { IEmployee } from '@ecoop/domains/iam'
import type {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

export interface IDisbursementTransaction extends ITimeStamps, IAuditable {
    id: TEntityId

    organization_id: TEntityId
    branch_id: TEntityId

    employee_user_id?: TEntityId
    employee_user?: IEmployee

    disbursement_id?: TEntityId
    disbursement?: IDisbursement

    transaction_batch_id?: TEntityId
    transaction_batch?: ITransactionBatch

    transaction_reference_number?: string
    reference_number?: string

    amount: number
}

export interface IDisbursementTransactionRequest {
    id?: TEntityId
    transaction_batch_id?: TEntityId
    disbursement_id?: TEntityId
    description?: string
    is_reference_number_checked: boolean
    reference_number: string
    amount: number
}

export type IDisbursementTransactionPaginated =
    IPaginatedResult<IDisbursementTransaction>

export type IDisbursementTransactionPaginated =
    IPaginatedResult<IDisbursementTransaction>
