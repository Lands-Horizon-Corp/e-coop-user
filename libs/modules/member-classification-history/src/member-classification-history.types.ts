import { IMemberClassification } from '@e-coop-monorepo/modules/member-classification'
import { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import {
    IAuditable,
    IOrgBranchIdentity,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

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
