import type z from 'zod'

import type { IMedia } from '@ecoop/platforms/media'
import type { IMemberProfile } from '../member-profile/member-profile.types'
import type { IBaseEntityMeta, IPaginatedResult } from '@ecoop/shared/types'

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
