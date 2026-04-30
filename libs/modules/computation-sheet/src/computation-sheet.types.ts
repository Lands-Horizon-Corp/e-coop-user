import type z from 'zod'

import type { IAccount } from '@e-coop-monorepo/modules/account'
import type { TMockCloanInputSchema } from '@e-coop-monorepo/modules/calculator'
import type { ICurrency } from '@e-coop-monorepo/modules/currency'
import type { ILoanAmortizationSchedule } from '@e-coop-monorepo/modules/loan-amortization-schedule'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import type { ComputationSheetSchema } from './computation-sheet.validation'

export interface IComputationSheet extends IBaseEntityMeta {
    name: string
    description?: string

    deliquent_account: boolean
    fines_account: boolean
    interest_account: boolean
    comaker_account: number
    exist_account: boolean

    currency_id: TEntityId
    currency: ICurrency

    created_at: string
    updated_at: string
    deleted_at?: string
}

export type IComputationSheetRequest = z.infer<typeof ComputationSheetSchema>

export type IComputationSheetPaginated = IPaginatedResult<IComputationSheet>

// FOR CALCULATOR USE ONLY
// Payload for computing amortization of a specific computation sheet
export type IComputationSheetAmortizationResponseRequest = TMockCloanInputSchema

export interface IComputationSheetAmortizationResponseDeduction {
    account: IAccount
    name?: string
    description?: string
    is_add_on: boolean
    type: 'static' | 'deduction' | 'add-on'
    credit: number
    debit: number
}

export interface IComputationSheetAmortizationResponse {
    currency: ICurrency

    entries: IComputationSheetAmortizationResponseDeduction[]
    total_debit: number
    total_credit: number

    total: number

    schedule: ILoanAmortizationSchedule[]
}
