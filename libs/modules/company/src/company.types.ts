import type z from 'zod'

import type { IMedia } from '@e-coop-monorepo/modules/media'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

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
