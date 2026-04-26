import z from 'zod'

import { IBaseEntityMeta, TEntityId } from '@e-coop-monorepo/shared/types'

import { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import { MemberContactReferenceSchema } from './member-contact-reference.validation'

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
