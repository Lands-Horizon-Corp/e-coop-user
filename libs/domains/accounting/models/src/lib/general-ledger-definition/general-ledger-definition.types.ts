import type z from 'zod'

import type { IAccount } from '../account/account.types'
import type { TGeneralLedgerType } from '../general-ledger/general-ledger.types'
import type { IBaseEntityMeta, TEntityId } from '@ecoop/shared/types'

import type { GeneralLedgerDefinitionSchema } from './general-ledger-definition.validation'

export interface IGeneralLedgerDefinition extends IBaseEntityMeta {
    general_ledger_definition_entry_id?: TEntityId

    general_ledger_definition_entries?: IGeneralLedgerDefinition[]
    accounts?: IAccount[]

    name: string
    description?: string
    index?: number
    name_in_total: string
    is_posting?: boolean
    general_ledger_type?: TGeneralLedgerType

    depth?: number

    beginning_balance_of_the_year_credit?: number
    beginning_balance_of_the_year_debit?: number
    budget_forecasting_of_the_year_percent?: number

    past_due?: string
    in_litigation?: string

    total_debit?: number
    total_credit?: number
    balance?: number
}

export type IGeneralLedgerDefinitionRequest = z.infer<
    typeof GeneralLedgerDefinitionSchema
>
