import z from 'zod'

import type { IMemberProfile } from '../member-profile/member-profile.types'
import type { IUser } from '@ecoop/domains/iam/models'
import type {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'
import { entityIdSchema } from '@ecoop/shared/validation'

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
