import { IBaseEntityMeta, TEntityId } from '@e-coop-monorepo/shared/types'

import { IBank } from '@e-coop-monorepo/modules/bank'
import { ICurrency } from '@e-coop-monorepo/modules/currency'
import { IMedia } from '@e-coop-monorepo/modules/media'
import { ITransactionBatch } from '@e-coop-monorepo/modules/transaction-batch'
import { IUserBase } from '@e-coop-monorepo/modules/user'
import { TOnlineRemittanceSchema } from './online-remittance.validation'

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
