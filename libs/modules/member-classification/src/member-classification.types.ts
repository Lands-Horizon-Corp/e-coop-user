import type z from 'zod'

import type {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import type { MemberClassificationSchema } from './member-classification.validation'

export interface IMemberClassification extends ITimeStamps, IAuditable {
    id: TEntityId

    name: string
    icon: string
    description: string

    // history?: IMemberClassificationHistory[]
}

export type IMemberClassificationRequest = z.infer<
    typeof MemberClassificationSchema
>

export type IMemberClassificationPaginated =
    IPaginatedResult<IMemberClassification>
