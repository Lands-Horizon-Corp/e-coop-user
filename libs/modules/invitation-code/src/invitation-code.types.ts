import {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { IBranch } from '@e-coop-monorepo/modules/branch'
import { IOrganization } from '@e-coop-monorepo/modules/organization'
import { TPermission } from '@e-coop-monorepo/modules/permission'
import { TUserType } from '@e-coop-monorepo/modules/user'

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
