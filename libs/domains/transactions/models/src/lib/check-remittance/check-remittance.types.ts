import type z from 'zod'

import type { IUserBase } from '@ecoop/domains/iam/models'
import type { IBank } from '@ecoop/platforms/bank'
import type { ICurrency } from '@ecoop/platforms/currency'
import type { IMedia } from '@ecoop/platforms/media/models'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { ITransactionBatch } from '../transaction-batch/transaction-batch.types'
import type { CheckRemittanceSchema } from './check-remittance.validation'

export interface ICheckRemittance extends IBaseEntityMeta {
    id: TEntityId

    bank_id: TEntityId
    bank?: IBank

    media_id: TEntityId
    media: IMedia

    currency_id: TEntityId
    currency: ICurrency

    employee_user_id: TEntityId
    employee_user: IUserBase

    transaction_batch_id: TEntityId
    transaction_batch: ITransactionBatch

    country_code: string
    reference_number: string
    account_name: string
    amount: number
    date_entry?: string
    description?: string
}

export type ICheckRemittanceRequest = z.infer<typeof CheckRemittanceSchema>

export type ICheckRemittancePaginated = IPaginatedResult<ICheckRemittance>
