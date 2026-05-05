import type z from 'zod'

import type { IAccount } from '../account/account.types'
import type { IComputationSheet } from '@ecoop/domains/rates-computations'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { IncludeNegativeAccountsSchema } from './include-negative-accounts.validation'

export interface IIncludeNegativeAccounts extends IBaseEntityMeta {
    computation_sheet_id: TEntityId
    computation_sheet: IComputationSheet

    account_id: TEntityId
    account: IAccount

    description: string | undefined
}

export type IIncludeNegativeAccountsRequest = z.infer<
    typeof IncludeNegativeAccountsSchema
>

export type IIncludeNegativeAccountsPaginated =
    IPaginatedResult<IIncludeNegativeAccounts>
