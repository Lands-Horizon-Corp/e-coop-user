import type z from 'zod'

import type { IMemberProfile } from '@ecoop/domains/member-crm'
import type { IBaseEntityMeta, TEntityId } from '@ecoop/shared/types'

import type { MemberContactReferenceSchema } from './member-contact-reference.validation'

// LATEST FROM ERD
export interface IMemberContactReference extends IBaseEntityMeta {
    id: TEntityId

    member_profile_id: TEntityId
    member_profile: IMemberProfile

    name: string
    description: string
    contact_number: string
}

// LATEST FROM ERD
export type IMemberContactReferenceRequest = z.infer<
    typeof MemberContactReferenceSchema
>
