import type z from 'zod'

import type { IMemberProfile } from '@ecoop/domains/member-crm'
import type { IBaseEntityMeta, TEntityId } from '@ecoop/shared/types'

import type { MemberRelativeAccountSchema } from './member-relative-account.validation'
import type { FAMILY_RELATIONSHIP } from './member-relative.constants'

export type TRelationship = (typeof FAMILY_RELATIONSHIP)[number] // move to member profile relative

// FROM LATEST ERD
export type IMemberRelativeAccountRequest = z.infer<
    typeof MemberRelativeAccountSchema
>

// FROM LATEST ERD
export interface IMemberRelativeAccount extends IBaseEntityMeta {
    id: TEntityId

    member_profile_id: TEntityId
    member_profile: IMemberProfile

    relative_member_profile_id: TEntityId
    relative_member_profile: IMemberProfile

    family_relationship: TRelationship
    description: string
}
