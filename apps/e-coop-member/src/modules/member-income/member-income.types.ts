import type { IMedia } from '@ecoop/modules/media'
import type { IMemberProfile } from '@ecoop/domains/member-crm'
import type { IBaseEntityMeta, TEntityId } from '@ecoop/shared/types'

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
