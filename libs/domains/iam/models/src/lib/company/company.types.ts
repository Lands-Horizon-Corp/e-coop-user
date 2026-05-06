import type z from 'zod'

import type { IMedia } from '@ecoop/platforms/media/models'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { CompanySchema } from './company.validation'

export interface ICompany extends IBaseEntityMeta {
    id: TEntityId
    name: string
    media_id?: TEntityId
    media?: IMedia
    description?: string
}

export type ICompanyRequest = z.infer<typeof CompanySchema>

export type ICompanyPaginated = IPaginatedResult<ICompany>
