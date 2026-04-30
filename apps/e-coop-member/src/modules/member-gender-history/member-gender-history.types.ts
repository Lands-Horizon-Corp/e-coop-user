import type { IMemberGender } from '@e-coop-monorepo/modules/member-gender'
import type { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

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
