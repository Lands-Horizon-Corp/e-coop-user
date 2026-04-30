import type {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

export interface ILoanGuaranteedFundRequest {
    scheme_number: number
    increasing_rate: number
}

export interface ILoanGuaranteedFund
    extends ITimeStamps, IAuditable, IOrgBranchIdentity {
    id: TEntityId
    scheme_number: number
    increasing_rate: number
}
