import z from 'zod'

import {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { IAccount } from '@e-coop-monorepo/modules/account'
import { LoanTermsAndConditionAmountReceiptSchema } from './loan-terms-and-condition-amount-receipt.validation'

export interface ILoanTermsAndConditionAmountReceipt extends IBaseEntityMeta {
    loan_transaction_id?: TEntityId // auto inserted by server
    account_id: TEntityId
    account: IAccount
    amount: number
}

export type ILoanTermsAndConditionAmountReceiptRequest = z.infer<
    typeof LoanTermsAndConditionAmountReceiptSchema
>

export type ILoanTermsAndConditionAmountReceiptPaginated =
    IPaginatedResult<ILoanTermsAndConditionAmountReceipt>
