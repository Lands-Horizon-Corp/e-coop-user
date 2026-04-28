import z from 'zod'

import { IBranch } from '@e-coop-monorepo/modules/branch'
import { IMedia } from '@e-coop-monorepo/modules/media'
import { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import { IBaseEntityMeta, TEntityId } from '@e-coop-monorepo/shared/types'

import { MemberAssetSchema } from './member-asset-validation'

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
