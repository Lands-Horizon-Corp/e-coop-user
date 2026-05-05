import type { IAccount } from '@ecoop/domains/accounting/models'
import type {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

export interface IFundsRequest {
    account_id?: TEntityId | null
    type: string
    description?: string
    icon?: string | null
    gl_books?: string
}

export interface IFunds extends ITimeStamps, IAuditable, IOrgBranchIdentity {
    id: TEntityId
    account_id?: TEntityId | null
    account?: IAccount
    type: string
    description: string
    icon?: string | null
    gl_books: string
}
