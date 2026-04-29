import z from 'zod'

import { IAccount } from '@e-coop-monorepo/modules/account'
import { ICurrency } from '@e-coop-monorepo/modules/currency'
import { IMemberGender } from '@e-coop-monorepo/modules/member-gender'
import { IMemberType } from '@e-coop-monorepo/modules/member-type'
import { IUnbalanceAccount } from '@e-coop-monorepo/modules/unbalance-account'
import {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import {
    BranchSettingRequestSchema,
    TBranchSettingsCurrencySchema,
} from './branch-settings.validation'

export type IBranchSettingsRequest = z.infer<typeof BranchSettingRequestSchema>

export type IBranchSettingsPaginated = IPaginatedResult<IBranchSettings>

//  FOR BRANCH SETTINGS CURRENCY

export type IBranchSettingsCurrencyRequest = TBranchSettingsCurrencySchema
