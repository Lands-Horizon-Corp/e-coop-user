import type { IBranch } from '@ecoop/modules/branch'
import type { IOrganization } from '@ecoop/modules/organization'
import type { TPermission } from '@ecoop/modules/permission'
import type { TUserType } from '@ecoop/modules/user'
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
