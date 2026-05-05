import type { IAccount } from '@ecoop/domains/accounting/models'
import type { IMemberProfile } from '@ecoop/domains/member-crm/models'
import type { IUser } from '@ecoop/domains/iam/models'
import type {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

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
