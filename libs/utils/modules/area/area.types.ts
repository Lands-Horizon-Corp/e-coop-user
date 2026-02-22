import z from 'zod'

import { IBaseEntityMeta, IPaginatedResult, TEntityId } from '@/types'

import { AreaSchema } from './area.validation'

export interface IArea extends IBaseEntityMeta {
    media_id: TEntityId
    media: any
    name: string
    latitude: number
    longitude: number
}

export type IAreaRequest = z.infer<typeof AreaSchema>

export type IAreaPaginated = IPaginatedResult<IArea>
