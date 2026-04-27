import { IAccount } from '@e-coop-monorepo/modules/account'
import { TEntityId } from '@e-coop-monorepo/shared/types'

// import { ILoanPaymentSchedule } from '@e-coop-monorepo/modules/loan-transaction'

export interface ILoanPayableAccount {
    account: IAccount
    account_id: TEntityId

    is_past_due?: boolean

    last_payment_date?: string
    supposed_payment_date?: string
    suggested_payment_amount: number

    // payment_schedule?: ILoanPaymentSchedule
}
