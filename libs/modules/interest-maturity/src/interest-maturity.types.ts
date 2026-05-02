import type { IAccount } from '@ecoop/modules/account'
import type {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

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
