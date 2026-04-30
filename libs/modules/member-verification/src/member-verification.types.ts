import z from 'zod'

import type { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import type { IUser } from '@e-coop-monorepo/modules/user'
import type {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'
import { entityIdSchema } from '@e-coop-monorepo/shared/validation'

export interface IMemberVerificationRequest {
    member_profile_id: TEntityId
    verified_by_user_id?: TEntityId
    status?: string
}

export interface IMemberVerificationResponse
    extends ITimeStamps, IAuditable, IOrgBranchIdentity {
    id: TEntityId
    member_profile_id: TEntityId
    member_profile?: IMemberProfile
    verified_by_user_id?: TEntityId
    verified_by_user?: IUser
    status: string
}

export const memberVerificationRequestSchema = z.object({
    member_profile_id: entityIdSchema,
    verified_by_user_id: entityIdSchema.optional(),
    status: z.string().optional(),
})
