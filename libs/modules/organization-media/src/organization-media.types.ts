import type z from 'zod'

import type { IMedia } from '@e-coop-monorepo/modules/media'
import type { IOrganization } from '@e-coop-monorepo/modules/organization'
import type {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import type { OrganizationMediaSchema } from './organization-media.validation'

export interface IOrganizationMedia extends IAuditable, ITimeStamps {
    id: TEntityId
    name: string
    description?: string
    organization_id: TEntityId
    organization?: IOrganization
    media_id: TEntityId
    media?: IMedia
}
export type IOrganizationMediaRequest = z.infer<typeof OrganizationMediaSchema>

export type IOrganizationMediaPaginated = IPaginatedResult<IOrganizationMedia>
