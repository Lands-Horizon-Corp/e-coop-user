import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

import type {
    IGeneralLedgerAccountGrouping,
    IGeneralLedgerAccountGroupingRequest,
} from './general-ledger-account-grouping.types'

const { apiCrudHooks } = createDataLayerFactory<
    IGeneralLedgerAccountGrouping,
    IGeneralLedgerAccountGroupingRequest
>({
    url: '/api/v1/general-ledger-accounts-grouping',
    baseKey: 'gl-accounts-grouping',
})

export const { useGetAll, useUpdateById } = apiCrudHooks

export const logger = Logger.getInstance('general-ledger-account-grouping')
