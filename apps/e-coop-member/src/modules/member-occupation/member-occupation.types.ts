import z from 'zod'

import { IBranch } from '@e-coop-monorepo/modules/branch'
import {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { MemberOccupationSchema } from './member-occupation.validation'

export interface IMemberOccupation extends ITimeStamps, IAuditable {
    id: TEntityId

    branch_id: TEntityId
    branch: IBranch

    name: string
    description: string
}

export type IMemberOccupationRequest = z.infer<typeof MemberOccupationSchema>

export type IMemberOccupationPaginated = IPaginatedResult<IMemberOccupation>
