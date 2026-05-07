import type z from 'zod'

import type { ICurrency } from '@ecoop/platforms/currency'
// import type { IMemberProfile } from '@ecoop/domains/member-crm/models'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { IAccount } from '../account/account.types'
import type { UnbalanceAccountSchema } from './unbalance-account.validation'

export interface IUnbalanceAccount<
    IMemberProfile = unknown,
> extends IBaseEntityMeta {
    currency_id: TEntityId
    currency: ICurrency

    account_for_shortage_id: TEntityId
    account_for_shortage: IAccount

    account_for_overage_id: TEntityId
    account_for_overage: IAccount

    cash_on_hand_account_id: TEntityId
    cash_on_hand_account: IAccount

    member_profile_id_for_shortage?: TEntityId
    member_profile_for_shortage?: IMemberProfile

    member_profile_id_for_overage?: TEntityId
    member_profile_for_overage?: IMemberProfile

    name: string
    description: string
}

export type IUnbalanceAccountRequest = z.infer<typeof UnbalanceAccountSchema>

export type IUnbalanceAccountPaginated = IPaginatedResult<IUnbalanceAccount>
