import type { IGroceryComputationSheet } from '@ecoop/modules/grocery-computation-sheet'
import type {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

export interface IGroceryComputationSheetMonthlyRequest {
    grocery_computation_sheet_id: TEntityId
    months?: number
    interest_rate?: number
    loan_guaranteed_fund_rate?: number
}

export interface IGroceryComputationSheetMonthly
    extends ITimeStamps, IAuditable, IOrgBranchIdentity {
    id: TEntityId
    grocery_computation_sheet_id: TEntityId
    grocery_computation_sheet?: IGroceryComputationSheet
    months: number
    interest_rate: number
    loan_guaranteed_fund_rate: number
}
