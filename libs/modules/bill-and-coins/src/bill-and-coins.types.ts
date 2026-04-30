import type { IBranch } from '@e-coop-monorepo/modules/branch'
import type { ICurrency } from '@e-coop-monorepo/modules/currency'
import type { IMedia } from '@e-coop-monorepo/modules/media'
import type { IOrganization } from '@e-coop-monorepo/modules/organization'
import type {
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import type { TBillsAndCoinSchema } from './bill-and-coins.validation'

export type IBillsAndCoinRequest = TBillsAndCoinSchema

export interface IBillsAndCoin extends ITimeStamps {
    id: TEntityId

    organization_id: TEntityId
    organization: IOrganization

    branch_id: TEntityId
    branch: IBranch

    created_by_id?: TEntityId
    updated_by_id?: TEntityId
    deleted_by_id?: TEntityId

    media_id?: TEntityId
    media?: IMedia

    name: string
    value: number

    currency_id: TEntityId
    currency: ICurrency
}

export type IBillsAndCoinPaginated = IPaginatedResult<IBillsAndCoin>
