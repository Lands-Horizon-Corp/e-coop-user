import type z from 'zod'

import type { IAccount } from '@e-coop-monorepo/modules/account'
import type { IComputationSheet } from '@e-coop-monorepo/modules/computation-sheet'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

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
