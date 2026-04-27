import { IAccount } from '@e-coop-monorepo/modules/account'
import { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import { IUser } from '@e-coop-monorepo/modules/user'
import {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

export interface ICollectorsMemberAccountEntryRequest {
    collector_user_id?: TEntityId
    member_profile_id?: TEntityId
    account_id?: TEntityId
    description?: string
}

export interface ICollectorsMemberAccountEntry
    extends ITimeStamps, IAuditable, IOrgBranchIdentity {
    id: TEntityId
    collector_user_id?: TEntityId
    collector_user?: IUser
    member_profile_id?: TEntityId
    member_profile?: IMemberProfile
    account_id?: TEntityId
    account?: IAccount
    description: string
}
