import type z from 'zod'

import type { IBranch } from '@ecoop/modules/branch'
import type { IBrowseReference } from '@ecoop/modules/browse-reference'
import type {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

import type { MemberTypeSchema } from './member-type.validation'

export interface IMemberType extends ITimeStamps, IAuditable {
    id: TEntityId

    branch_id?: TEntityId
    branch?: IBranch

    name: string
    prefix: string
    description: string

    browse_references?: IBrowseReference[]
}

export type IMemberTypeRequest = z.infer<typeof MemberTypeSchema>

export type IMemberTypePaginated = IPaginatedResult<IMemberType>
