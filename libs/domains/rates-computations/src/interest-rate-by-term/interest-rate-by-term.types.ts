import type { IMemberClassificationInterestRate } from '../member-classification-interest-rate/member-classification-interest-rate.types'
import type {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

export interface IInterestRateByTermRequest {
    name?: string
    descrition?: string
    member_classification_interest_rate_id?: TEntityId
}

export interface IInterestRateByTerm
    extends ITimeStamps, IAuditable, IOrgBranchIdentity {
    id: TEntityId
    name: string
    descrition: string
    member_classification_interest_rate_id: TEntityId
    member_classification_interest_rate?: IMemberClassificationInterestRate
}
