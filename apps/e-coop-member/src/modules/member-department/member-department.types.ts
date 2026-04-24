import z from 'zod'

import {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { MemberDepartmentSchema } from './member-department.validation'

export interface IMemberDepartment extends IBaseEntityMeta {
    id: TEntityId
    name: string
    description?: string
    icon?: string
}

export type IMemberDepartmentRequest = z.infer<typeof MemberDepartmentSchema>

export type IMemberDepartmentPaginated = IPaginatedResult<IMemberDepartment>
