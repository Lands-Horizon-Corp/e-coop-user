import type z from 'zod'

import type { IMedia } from '@e-coop-monorepo/modules/media'
import type { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import type { MemberProfileMediaSchema } from './member-profile-media.validation'

export interface IMemberProfileMedia extends IBaseEntityMeta {
    member_profile_id?: string
    member_profile?: IMemberProfile
    media_id?: string
    media?: IMedia
    name: string
    description: string
}

export type IMemberProfileMediaRequest = z.infer<
    typeof MemberProfileMediaSchema
>

export type IMemberProfileMediaPaginated = IPaginatedResult<IMemberProfileMedia>

export type IMemberProfileMediaBulkRequest = {
    ids: TEntityId[]
}
