import type z from 'zod'

import type { IMedia } from '@ecoop/platforms/media'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { BankSchema } from './bank.validation'

export interface IBank extends IBaseEntityMeta {
    id: TEntityId
    name: string
    media_id?: TEntityId
    media?: IMedia
    description?: string
}

export type IBankRequest = z.infer<typeof BankSchema>

export type IBankPaginated = IPaginatedResult<IBank>
