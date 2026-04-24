import z from 'zod'

import { IMedia } from '@e-coop-monorepo/modules/media/media.types'
import { IMemberProfile } from '@e-coop-monorepo/modules/member-profile/member-profile.types'
import {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { MemberProfileMediaSchema } from './member-profile-media.validation'

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
