import type z from 'zod'

import type { IMedia } from '@ecoop/modules/media'
import type { IMemberProfile } from '../member-profile/member-profile.types'
import type { TRelationship } from '../member-relative-account/member-relative-account.types'
import type { IBaseEntityMeta, TEntityId } from '@ecoop/shared/types'

import type { MemberJointAccountSchema } from './member-joint-account.validation'

// LATEST FROM ERD
export interface IMemberJointAccount extends IBaseEntityMeta {
    id: TEntityId

    member_profile_id: TEntityId
    member_profile: IMemberProfile

    picture_media_id: TEntityId
    picture_media: IMedia

    signature_media_id: TEntityId
    signature_media: IMedia

    description?: string

    first_name: string
    middle_name?: string
    last_name: string
    full_name: string
    suffix?: string

    birthday: string
    family_relationship: TRelationship
}

// LATEST FROM ERD
export type IMemberJointAccountRequest = z.infer<
    typeof MemberJointAccountSchema
> & { full_name: string }
