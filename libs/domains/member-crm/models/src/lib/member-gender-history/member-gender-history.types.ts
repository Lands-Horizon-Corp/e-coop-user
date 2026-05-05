import type { IMemberGender } from '../member-gender/member-gender.types'
import type { IMemberProfile } from '../member-profile/member-profile.types'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

export interface IMemberGenderHistoryRequest {
    member_profile_id: TEntityId
    member_gender_id: TEntityId
}

export interface IMemberGenderHistory extends IBaseEntityMeta {
    id: TEntityId
    member_profile_id: TEntityId
    member_profile?: IMemberProfile
    member_gender_id: TEntityId
    member_gender?: IMemberGender
}

export type IMemberGenderHistoryPaginated =
    IPaginatedResult<IMemberGenderHistory>
