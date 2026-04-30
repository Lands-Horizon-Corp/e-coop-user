import type { IFinancialStatementDefinition } from '@e-coop-monorepo/modules/financial-statement-definition'
import type {
    IAuditable,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

export interface IFinancialStatementAccountGrouping
    extends IAuditable, ITimeStamps {
    id: TEntityId

    organization_id: TEntityId
    branch_id: TEntityId

    debit: number
    credit: number
    name: string
    description: string
    financial_statement_definition_entries: IFinancialStatementDefinition[]

    from_code?: number
    to_code?: number
}

export interface IFinancialStatementAccountGroupingRequest {
    debit?: number
    credit?: number

    name: string
    description?: string
}
