import type z from 'zod'

import type { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import type { IBaseEntityMeta, TEntityId } from '@e-coop-monorepo/shared/types'

import type { MemberAddressSchema } from './member-address.validation'

export interface IMemberAddress extends IBaseEntityMeta {
    id: TEntityId
    member_profile_id: TEntityId
    member_profile: IMemberProfile

    label: string
    address: string
    country_code: string

    city?: string
    postal_code?: string
    province_state?: string
    barangay?: string
    landmark?: string

    longitude?: number
    latitude?: number
}

// LATEST FROM ERD
export type IMemberAddressRequest = z.infer<typeof MemberAddressSchema>
