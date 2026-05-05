import type { IAccount } from '@ecoop/domains/accounting/models'
import type { TEntityId } from '@ecoop/shared/types'

// import { ILoanPaymentSchedule } from '@ecoop/domains/loans/modules/loan-transaction'

export interface ILoanPayableAccount {
    account: IAccount
    account_id: TEntityId

    is_past_due?: boolean

    last_payment_date?: string
    supposed_payment_date?: string
    suggested_payment_amount: number

    // payment_schedule?: ILoanPaymentSchedule
}
