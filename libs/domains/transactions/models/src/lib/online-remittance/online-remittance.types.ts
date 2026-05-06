import type { IUserBase } from '@ecoop/domains/iam/models'
import type { IBank } from '@ecoop/platforms/bank'
import type { ICurrency } from '@ecoop/platforms/currency'
import type { IMedia } from '@ecoop/platforms/media/models'
import type { IBaseEntityMeta, TEntityId } from '@ecoop/shared/types'

import type { ITransactionBatch } from '../transaction-batch/transaction-batch.types'
import type { TOnlineRemittanceSchema } from './online-remittance.validation'

export interface IOnlineRemittance extends IBaseEntityMeta {
    id: TEntityId

    bank_id: TEntityId
    bank: IBank

    media_id: TEntityId
    user_media?: IMedia

    employee_user_id: TEntityId
    employee_user: IUserBase

    transaction_batch_id: TEntityId
    transaction_batch: ITransactionBatch

    currency_id: TEntityId
    currency: ICurrency

    reference_number: string
    account_name: string
    amount: number
    date_entry?: string
    description?: string
}

export type IOnlineRemittanceRequest = TOnlineRemittanceSchema
