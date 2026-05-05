import type z from 'zod'

import type {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

import type { MemberCenterSchema } from './member-center.validation'

export type IMemberCenterRequest = z.infer<typeof MemberCenterSchema>

export interface IMemberCenter extends ITimeStamps, IAuditable {
    id: TEntityId

    name: string
    description: string
}

export type IMemberCenterPaginated = IPaginatedResult<IMemberCenter>
