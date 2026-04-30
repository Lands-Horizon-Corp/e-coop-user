import type z from 'zod'

import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import type { AreaSchema } from './area.validation'

export interface IArea extends IBaseEntityMeta {
    media_id: TEntityId
    media: any
    name: string
    latitude: number
    longitude: number
}

export type IAreaRequest = z.infer<typeof AreaSchema>

export type IAreaPaginated = IPaginatedResult<IArea>
