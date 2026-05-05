import z from 'zod'

import type { IMemberProfile } from '@ecoop/domains/member-crm/models'
import type {
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'
import { entityIdSchema } from '@ecoop/shared/validation'

export interface IMemberMutualFundHistoryRequest {
    member_profile_id: TEntityId
    title: string
    amount: number
    description?: string
}

export interface IMemberMutualFundHistoryResponse
    extends ITimeStamps, IOrgBranchIdentity {
    id: TEntityId
    member_profile_id: TEntityId
    member_profile?: IMemberProfile
    title: string
    amount: number
    description: string
}

export const memberMutualFundHistoryRequestSchema = z.object({
    member_profile_id: entityIdSchema,
    title: z.string().min(1).max(255),
    amount: z.number(),
    description: z.string().optional(),
})
