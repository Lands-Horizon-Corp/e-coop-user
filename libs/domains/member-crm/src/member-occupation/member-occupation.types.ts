import type z from 'zod'

import type { IBranch } from '@ecoop/domains/iam'
import type {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

import type { MemberOccupationSchema } from './member-occupation.validation'

export interface IMemberOccupation extends ITimeStamps, IAuditable {
    id: TEntityId

    branch_id: TEntityId
    branch: IBranch

    name: string
    description: string
}

export type IMemberOccupationRequest = z.infer<typeof MemberOccupationSchema>

export type IMemberOccupationPaginated = IPaginatedResult<IMemberOccupation>
