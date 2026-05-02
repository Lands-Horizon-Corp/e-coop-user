import type { IAccount } from '@ecoop/modules/account'
import type {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

export interface IGeneralAccountGroupingNetSurplusPositiveRequest {
    name: string
    description?: string
    account_id: TEntityId
    percentage_1?: number
    percentage_2?: number
}

export interface IGeneralAccountGroupingNetSurplusPositive
    extends ITimeStamps, IAuditable, IOrgBranchIdentity {
    id: TEntityId
    account_id: TEntityId
    account?: IAccount
    name: string
    description: string
    percentage_1: number
    percentage_2: number
}
