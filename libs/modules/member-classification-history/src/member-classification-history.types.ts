import type { IMemberClassification } from '@ecoop/modules/member-classification'
import type { IMemberProfile } from '@ecoop/modules/member-profile'
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
