import type { IMemberDepartment } from '@e-coop-monorepo/modules/member-department'
import type { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

export interface IMemberDepartmentHistoryRequest {
    member_department_id: TEntityId
    member_profile_id: TEntityId
    branch_id: TEntityId
    organization_id: TEntityId
}

export interface IMemberDepartmentHistory extends IBaseEntityMeta {
    id: TEntityId
    member_department_id: TEntityId
    member_department?: IMemberDepartment
    member_profile_id: TEntityId
    member_profile?: IMemberProfile
}

export type IMemberDepartmentHistoryPaginated =
    IPaginatedResult<IMemberDepartmentHistory>
