// import z from 'zod'
import { IAccount } from '@e-coop-monorepo/modules/account'
import { IBaseEntityMeta } from '@e-coop-monorepo/shared/types'

// import { LoanAmortizationScheduleSchema } from './loan-amortization-schedule.validation'

export interface IAccountValue {
    account: IAccount
    total: number
    value: number
}

export interface ILoanAmortizationSchedule extends IBaseEntityMeta {
    scheduled_date: string
    actual_date: string
    days_skipped: number
    total: number
    balance: number
    accounts: IAccountValue[]
}

// export type ILoanAmortizationScheduleRequest = z.infer<
//     typeof LoanAmortizationScheduleSchema
// >

// export interface ILoanAmortizationSchedulePaginated
//     extends IPaginatedResult<ILoanAmortizationSchedule> {}
