import type z from 'zod'

import type { IBank } from '@ecoop/modules/bank'
import type { ICurrency } from '@ecoop/modules/currency'
import type { IMedia } from '@ecoop/modules/media'
import type { ITransactionBatch } from '@ecoop/modules/transaction-batch'
import type { IUserBase } from '@ecoop/modules/user'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

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
