import type { IMedia } from '@ecoop/platforms/media/models'
import type { IBaseEntityMeta, TEntityId } from '@ecoop/shared/types'

import type { IMemberProfile } from '../member-profile/member-profile.types'

export interface IMemberIncomeRequest {
    media_id?: TEntityId
    name: string
    amount: number
    release_date?: string
}

export interface IMemberIncome extends IBaseEntityMeta {
    id: TEntityId
    media_id?: TEntityId
    media?: IMedia
    member_profile_id: TEntityId
    member_profile?: IMemberProfile
    name: string
    amount: number
    release_date?: string
}
