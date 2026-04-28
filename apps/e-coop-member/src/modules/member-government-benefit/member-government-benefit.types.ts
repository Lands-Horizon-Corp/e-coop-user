import { IBaseEntityMeta, TEntityId } from '@e-coop-monorepo/shared/types'

import { IMedia } from '@e-coop-monorepo/modules/media'
import { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import { TMemberGovernmentBenefitSchema } from './member-government-benefit.validation'
import { IGovernmentId } from './member-government-benefit.interfaces'

// LATEST FROM ERD
export type IMemberGovernmentBenefitRequest = TMemberGovernmentBenefitSchema

// LATEST FROM ERD
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


