import z from 'zod'

import { IAccount } from '@e-coop-monorepo/modules/account'
import { TGeneralLedgerType } from '@e-coop-monorepo/modules/general-ledger'
import { IBaseEntityMeta, TEntityId } from '@e-coop-monorepo/shared/types'

import { GeneralLedgerDefinitionSchema } from './general-ledger-definition.validation'

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
