import type z from 'zod'

import type { IBranch } from '@ecoop/modules/branch'
import type { ICurrency } from '@ecoop/modules/currency'
import type { IMedia } from '@ecoop/modules/media'
import type { IOrganization } from '@ecoop/modules/organization'
import type { ITransactionBatch } from '@ecoop/modules/transaction-batch'
import type { IUserBase } from '@ecoop/modules/user'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { BatchFundingSchema } from './batch-funding.validation'

export interface IBatchFunding extends IBaseEntityMeta {
    id: TEntityId

    organization_id: TEntityId
    organization: IOrganization

    currency_id: TEntityId
    currency: ICurrency

    branch_id: TEntityId
    branch: IBranch

    transaction_batch_id: TEntityId
    transaction_batch?: ITransactionBatch

    provided_by_user_id: TEntityId
    provided_by_user: IUserBase

    signature_media_id?: TEntityId
    signature_media?: IMedia

    name: string
    amount: number
    description?: string
}

export type IBatchFundingRequest = z.infer<typeof BatchFundingSchema>

export type IBatchFundingPaginated = IPaginatedResult<IBatchFunding>
