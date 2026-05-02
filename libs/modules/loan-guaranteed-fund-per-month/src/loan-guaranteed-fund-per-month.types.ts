import type {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

export interface ILoanGuaranteedFundPerMonthRequest {
    month?: number
    loan_guaranteed_fund?: number
}

export interface ILoanGuaranteedFundPerMonth
    extends ITimeStamps, IAuditable, IOrgBranchIdentity {
    id: TEntityId
    month: number
    loan_guaranteed_fund: number
}
