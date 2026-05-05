import type z from 'zod'

import type { IAccount } from '@ecoop/domains/accounting'
import type { IComputationSheet } from '../computation-sheet/computation-sheet.types'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { BrowseExcludeIncludeAccountsSchema } from './browse-exclude-include-accounts.validation'

export interface IBrowseExcludeIncludeAccounts extends IBaseEntityMeta {
    computation_sheet_id: TEntityId
    computation_sheet: IComputationSheet

    fines_account_id: TEntityId
    fines_account: IAccount

    comaker_account_id: TEntityId
    comaker_account: IAccount

    interest_account_id: TEntityId
    interest_account: IAccount

    deliquent_account_id: TEntityId
    deliquent_account: IAccount

    include_existing_loan_account_id: TEntityId
    include_existing_loan_account: IAccount
}

export type IBrowseExcludeIncludeAccountsRequest = z.infer<
    typeof BrowseExcludeIncludeAccountsSchema
>

export type IBrowseExcludeIncludeAccountsPaginated =
    IPaginatedResult<IBrowseExcludeIncludeAccounts>
