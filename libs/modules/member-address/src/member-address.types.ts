import type z from 'zod'

import type { IArea } from '@ecoop/modules/area'
import type { IBaseEntityMeta, TEntityId } from '@ecoop/shared/types'

// import { IMemberProfile } from '@ecoop/modules/member-profile'
import type { HOME_TYPES } from './member-address.constants'
import type { MemberAddressSchema } from './member-address.validation'

export interface IMemberAddress extends IBaseEntityMeta {
    id: TEntityId

    // member_profile_id: TEntityId
    // member_profile: IMemberProfile

    label: THomeType
    address: string
    country_code: string

    city?: string
    postal_code?: string
    province_state?: string
    barangay?: string
    landmark?: string

    area_id?: TEntityId
    area?: IArea

    longitude?: number
    latitude?: number
}

export type THomeType = (typeof HOME_TYPES)[number]

// LATEST FROM ERD
export type IMemberAddressRequest = z.infer<typeof MemberAddressSchema>
