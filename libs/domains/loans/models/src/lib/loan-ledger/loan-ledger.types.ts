import type z from 'zod'

import type { IBaseEntityMeta, IPaginatedResult } from '@ecoop/shared/types'

import type {
    LoanLedgerSchema,
    TLoanLedgerChangeLineSchema,
} from './loan-ledger.validation'

export interface ILoanLedger extends IBaseEntityMeta {
    //add here

    line_number?: number

    reference_number: string
    entry_date: string
    debit: number
    credit: number
    balance: number
    type: 'CASH'
}

export type ILoanLedgerRequest = z.infer<typeof LoanLedgerSchema>

export type ILoanLedgerPaginated = IPaginatedResult<ILoanLedger>

export type ILoanLedgerChangeLineRequest = TLoanLedgerChangeLineSchema
