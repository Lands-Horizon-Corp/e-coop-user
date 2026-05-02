import type { IMemberClassificationInterestRate } from '@ecoop/modules/member-classification-interest-rate'
import type {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

export interface IInterestRatePercentageRequest {
    name?: string
    description?: string
    months?: number
    interest_rate?: number
    member_classification_interest_rate_id?: TEntityId
}

export interface IInterestRatePercentage
    extends ITimeStamps, IAuditable, IOrgBranchIdentity {
    id: TEntityId
    name: string
    description: string
    months: number
    interest_rate: number
    member_classification_interest_rate_id: TEntityId
    member_classification_interest_rate?: IMemberClassificationInterestRate
}
