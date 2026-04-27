import z from 'zod'

import { IBranch } from '@e-coop-monorepo/modules/branch'
import { IBrowseReference } from '@e-coop-monorepo/modules/browse-reference'
import {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { MemberTypeSchema } from './member-type.validation'

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
