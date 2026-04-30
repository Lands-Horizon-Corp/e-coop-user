import z from 'zod'

import type { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import type {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'
import { entityIdSchema } from '@e-coop-monorepo/shared/validation'

export interface IMemberDamayanExtensionEntryRequest {
    member_profile_id: TEntityId
    name: string
    description?: string
    birthdate?: string
}

export interface IMemberDamayanExtensionEntryResponse
    extends ITimeStamps, IAuditable, IOrgBranchIdentity {
    id: TEntityId
    member_profile_id: TEntityId
    member_profile?: IMemberProfile
    name: string
    description: string
    birthdate?: string
}

export const memberDamayanExtensionEntryRequestSchema = z.object({
    member_profile_id: entityIdSchema,
    name: z.string().min(1).max(255),
    description: z.string().optional(),
    birthdate: z.string().datetime().optional(),
})
