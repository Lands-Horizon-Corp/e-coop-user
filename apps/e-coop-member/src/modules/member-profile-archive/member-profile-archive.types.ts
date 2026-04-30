import type z from 'zod'

import type { IMedia } from '@e-coop-monorepo/modules/media'
import type { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
} from '@e-coop-monorepo/shared/types'

import type {
    MemberProfileArchiveSchema,
    TMemberProfileArchiveBulkUpdateSchema,
} from './member-profile-archive.validation'

export interface IMemberProfileArchive extends IBaseEntityMeta {
    member_profile_id?: string
    member_profile?: IMemberProfile
    media_id?: string
    media?: IMedia
    name: string
    description: string
    category: string
}

export type IMemberProfileArchiveRequest = z.infer<
    typeof MemberProfileArchiveSchema
>

export type IMemberProfileArchivePaginated =
    IPaginatedResult<IMemberProfileArchive>

export type IMemberProfileArchiveBulkRequest =
    TMemberProfileArchiveBulkUpdateSchema

export interface IMemberProfileArchiveCategory {
    name: string
    count: number
}
