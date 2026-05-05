import type { IBranch } from '../branch/branch.types'
import type { IOrganization } from '../organization/organization.types'
import type { TPermission } from '../permission/permission.types'
import type { TUserType } from '../user/user.types'
import type {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

// Invitation Code Resource
export interface IInvitationCode extends ITimeStamps, IAuditable {
    id: TEntityId

    user_type: TUserType
    code: string

    expiration_date?: string
    max_use: number
    current_use: number

    permission_name: string
    permission_description: string
    permissions: TPermission[]

    description: string
    branch: IBranch
    organization: IOrganization
}

export interface IInvitationCodeRequest {
    id?: TEntityId

    user_type: TUserType
    code: string

    expiration_date?: string
    max_use: number
    current_use?: number

    permission_name: string
    permission_description: string
    permissions: TPermission[]

    description: string
}

export type IInvitationCodePaginated = IPaginatedResult<IInvitationCode>
