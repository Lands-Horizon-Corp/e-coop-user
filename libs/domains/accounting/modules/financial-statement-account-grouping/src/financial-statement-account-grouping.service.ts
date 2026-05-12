import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

import type {
    IFinancialStatementAccountGrouping,
    IFinancialStatementAccountGroupingRequest,
} from '@ecoop/accounting/models'

const { apiCrudHooks } = createDataLayerFactory<
    IFinancialStatementAccountGrouping,
    IFinancialStatementAccountGroupingRequest
>({
    url: '/api/v1/financial-statement-grouping',
    baseKey: 'fs-accounts-grouping',
})

export const { useGetAll, useUpdateById } = apiCrudHooks

export const logger = Logger.getInstance('financial-statement-account-grouping')
