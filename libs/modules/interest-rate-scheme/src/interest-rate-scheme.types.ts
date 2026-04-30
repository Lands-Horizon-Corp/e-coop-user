import type {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

export interface IInterestRateSchemeRequest {
    name: string
    description?: string
}

export interface IInterestRateScheme
    extends ITimeStamps, IAuditable, IOrgBranchIdentity {
    id: TEntityId
    name: string
    description: string
}
