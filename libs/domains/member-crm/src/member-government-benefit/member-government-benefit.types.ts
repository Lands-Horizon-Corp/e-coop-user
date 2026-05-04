import type { IMedia } from '@ecoop/modules/media'
import type { IMemberProfile } from '../member-profile/member-profile.types'
import type { IBaseEntityMeta, TEntityId } from '@ecoop/shared/types'

import { IGovernmentId } from './member-government-benefit.interfaces'
import type { TMemberGovernmentBenefitSchema } from './member-government-benefit.validation'

// LATEST FROM ERD
export type IMemberGovernmentBenefitRequest = TMemberGovernmentBenefitSchema
export interface IMemberGovernmentBenefit extends IBaseEntityMeta {
    id: TEntityId

    member_profile_id: TEntityId
    member_profile: IMemberProfile

    front_media_id: TEntityId
    front_media: IMedia

    back_media_id: TEntityId
    back_media: IMedia

    name: string
    country_code: string
    value?: string
    expiry_date?: string
    description: string
}
