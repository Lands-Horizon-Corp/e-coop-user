import { IMemberClassificationInterestRate } from '@e-coop-monorepo/modules/member-classification-interest-rate'
import {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

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
