import type z from 'zod'

import type { IMedia } from '@ecoop/platforms/media/models'
import type {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

import type { IOrganization } from '../organization/organization.types'
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
