import type z from 'zod'

import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { GenderSchema } from './member-gender.validation'

export interface IMemberGender extends IBaseEntityMeta {
    id: TEntityId

    name: string
    description: string
}

export type IMemberGenderRequest = z.infer<typeof GenderSchema>

export type IMemberGenderPaginated = IPaginatedResult<IMemberGender>
