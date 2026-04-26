import z from 'zod'

import {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { IBranch } from '@e-coop-monorepo/modules/branch'
import { ICurrency } from '@e-coop-monorepo/modules/currency'
import { IMedia } from '@e-coop-monorepo/modules/media'
import { IOrganization } from '@e-coop-monorepo/modules/organization'
import { ITransactionBatch } from '@e-coop-monorepo/modules/transaction-batch'
import { IUserBase } from '@e-coop-monorepo/modules/user'
import { BatchFundingSchema } from './batch-funding.validation'

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
