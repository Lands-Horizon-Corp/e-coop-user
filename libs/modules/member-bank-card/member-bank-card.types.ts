import z from 'zod'

import type { IBank } from '@ecoop/modules/bank'
import type { IMemberProfile } from '@ecoop/modules/member-profile'
import type {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'
import { entityIdSchema } from '@ecoop/shared/validation'

export interface IMemberBankCardRequest {
    account_number: string
    card_name: string
    expiration_date: string
    is_default?: boolean
    bank_id?: TEntityId
    member_profile_id?: TEntityId
}

export interface IMemberBankCardResponse
    extends ITimeStamps, IAuditable, IOrgBranchIdentity {
    id: TEntityId
    bank_id?: TEntityId
    bank?: IBank
    member_profile_id?: TEntityId
    member_profile?: IMemberProfile
    account_number: string
    card_name: string
    expiration_date: string
    is_default: boolean
}

export const memberBankCardRequestSchema = z.object({
    account_number: z.string().min(1).max(50),
    card_name: z.string().min(1).max(50),
    expiration_date: z.string(),
    is_default: z.boolean().optional(),
    bank_id: entityIdSchema.optional(),
    member_profile_id: entityIdSchema.optional(),
})
