import type { IMemberClassification } from '../member-classification/member-classification.types'
import type { IMemberProfile } from '../member-profile/member-profile.types'
import type {
    IAuditable,
    IOrgBranchIdentity,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

export interface IMemberClassificationHistoryRequest {
    member_classification_id: TEntityId
    member_profile_id: TEntityId
    branch_id: TEntityId
    organization_id: TEntityId
}

export interface IMemberClassificationHistory
    extends ITimeStamps, IAuditable, IOrgBranchIdentity {
    id: TEntityId
    member_classification_id: TEntityId
    member_classification?: IMemberClassification
    member_profile_id: TEntityId
    member_profile?: IMemberProfile
}

export type IMemberClassificationHistoryPaginated =
    IPaginatedResult<IMemberClassificationHistory>
