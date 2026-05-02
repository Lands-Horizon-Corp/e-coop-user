import type {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

export interface IGroceryComputationSheetRequest {
    scheme_number: number
    description?: string
}

export interface IGroceryComputationSheet
    extends ITimeStamps, IAuditable, IOrgBranchIdentity {
    id: TEntityId
    scheme_number: number
    description: string
}
