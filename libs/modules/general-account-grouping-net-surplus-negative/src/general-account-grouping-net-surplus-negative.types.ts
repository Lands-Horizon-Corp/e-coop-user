import { IAccount } from '@e-coop-monorepo/modules/account'
import {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

export interface IGeneralAccountGroupingNetSurplusNegativeRequest {
    name: string
    description?: string
    account_id: TEntityId
    percentage_1?: number
    percentage_2?: number
}

export interface IGeneralAccountGroupingNetSurplusNegative
    extends ITimeStamps, IAuditable, IOrgBranchIdentity {
    id: TEntityId
    account_id: TEntityId
    account?: IAccount
    name: string
    description: string
    percentage_1: number
    percentage_2: number
}
