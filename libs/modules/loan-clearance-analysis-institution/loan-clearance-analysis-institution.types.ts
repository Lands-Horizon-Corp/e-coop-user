import type z from 'zod'

import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { LoanClearanceAnalysisInstitutionSchema } from './loan-clearance-analysis-institution.validation'

export interface ILoanClearanceAnalysisInstitution extends IBaseEntityMeta {
    loan_transaction_id?: TEntityId
    name: string
    description: string
}

export type ILoanClearanceAnalysisInstitutionRequest = z.infer<
    typeof LoanClearanceAnalysisInstitutionSchema
>

export type ILoanClearanceAnalysisInstitutionPaginated =
    IPaginatedResult<ILoanClearanceAnalysisInstitution>
