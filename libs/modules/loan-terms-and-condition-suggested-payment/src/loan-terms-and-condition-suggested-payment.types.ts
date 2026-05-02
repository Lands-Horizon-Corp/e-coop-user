import type z from 'zod'

import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { LoanTermsAndConditionSuggestedPaymentSchema } from './loan-terms-and-condition-suggested-payment.validation'

export interface ILoanTermsAndConditionSuggestedPayment extends IBaseEntityMeta {
    loan_transaction_id: TEntityId
    name: string
    description: string
}

export type ILoanTermsAndConditionSuggestedPaymentRequest = z.infer<
    typeof LoanTermsAndConditionSuggestedPaymentSchema
>

export type ILoanTermsAndConditionSuggestedPaymentPaginated =
    IPaginatedResult<ILoanTermsAndConditionSuggestedPayment>
