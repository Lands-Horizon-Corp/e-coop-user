import type z from 'zod'

import type { IBranch } from '@ecoop/domains/iam/models'
import type { IMedia } from '@ecoop/platforms/media'
import type { IMemberProfile } from '../member-profile/member-profile.types'
import type { IBaseEntityMeta, TEntityId } from '@ecoop/shared/types'

import type { MemberAssetSchema } from './member-asset.validation'

export interface IMemberAsset extends IBaseEntityMeta {
    id: TEntityId
    media_id?: TEntityId
    media?: IMedia

    member_profile_id: TEntityId
    member_profile: IMemberProfile

    branch_id: TEntityId
    branch: IBranch

    name: string
    entry_date: string
    description?: string
    cost: number
}

export type IMemberAssetRequest = z.infer<typeof MemberAssetSchema>
