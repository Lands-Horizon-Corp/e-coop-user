import z from 'zod'

import type { IMemberProfile } from '../member-profile/member-profile.types'
import type { ITimeStamps, TEntityId } from '@ecoop/shared/types'
import {
    descriptionTransformerSanitizer,
    entityIdSchema,
} from '@ecoop/shared/validation'

export interface IMemberRecruitedMembers extends ITimeStamps {
    id: TEntityId
    member_profile_id: TEntityId
    members_profile_recruited_id: TEntityId
    date_recruited: string
    description: string
    name: string
    members_profile: IMemberProfile
    members_profile_recruited?: IMemberProfile
}

export const memberRecruitsSchema = z.object({
    id: entityIdSchema.optional(),
    members_profile_id: entityIdSchema.optional(),
    members_profile_recruited_id: entityIdSchema,
    date_recruited: z.string().min(1, 'Date recruited is required'),
    description: z
        .string()
        .optional()
        .transform(descriptionTransformerSanitizer),
    name: z.string().min(1, 'Name is required'),
})
