import z from 'zod'

import { IAccount } from '@e-coop-monorepo/modules/account'
import { ICurrency } from '@e-coop-monorepo/modules/currency'
import { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { UnbalanceAccountSchema } from './unbalance-account.validation'

export interface IUnbalanceAccount extends IBaseEntityMeta {
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
