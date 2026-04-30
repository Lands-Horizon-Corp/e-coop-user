import type z from 'zod'

import type { IAccount } from '@e-coop-monorepo/modules/account'
import type { IAccountHistory } from '@e-coop-monorepo/modules/account-history'
import type { LoanTransaction } from '@e-coop-monorepo/modules/automatic-loan-deduction'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import type { LoanAccountSchema } from './loan-account.validation'

export interface ILoanAccount extends IBaseEntityMeta {
    id: string

    loan_transaction_id: TEntityId
    loan_transaction?: LoanTransaction

    account_id: TEntityId
    account: IAccount

    account_history_id?: TEntityId
    account_history?: IAccountHistory

    amount: number

    total_add: number
    total_add_count: number

    total_deduction: number
    total_deduction_count: number

    total_payment: number
    total_payment_count: number
}

export type ILoanAccountRequest = z.infer<typeof LoanAccountSchema>

export type ILoanAccountPaginated = IPaginatedResult<ILoanAccount>
