import {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { IAccount } from '@e-coop-monorepo/modules/account'

export interface IInterestMaturityRequest {
    account_id?: TEntityId | null
    from: number
    to: number
    rate: number
}

export interface IInterestMaturity
    extends ITimeStamps, IAuditable, IOrgBranchIdentity {
    id: TEntityId
    account_id?: TEntityId | null
    account?: IAccount
    from: number
    to: number
    rate: number
}
