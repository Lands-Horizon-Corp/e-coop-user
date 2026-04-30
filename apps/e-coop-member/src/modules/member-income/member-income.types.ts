import type { IMedia } from '@e-coop-monorepo/modules/media'
import type { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import type { IBaseEntityMeta, TEntityId } from '@e-coop-monorepo/shared/types'

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
