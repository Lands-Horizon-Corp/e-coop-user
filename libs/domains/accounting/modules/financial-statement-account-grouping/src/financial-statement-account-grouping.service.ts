import type {
    IFinancialStatementAccountGrouping,
    IFinancialStatementAccountGroupingRequest,
} from '@ecoop/domains/accounting/models'
import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

const { apiCrudHooks } = createDataLayerFactory<
    IFinancialStatementAccountGrouping,
    IFinancialStatementAccountGroupingRequest
>({
    url: '/api/v1/financial-statement-grouping',
    baseKey: 'fs-accounts-grouping',
})

export const { useGetAll, useUpdateById } = apiCrudHooks

export const logger = Logger.getInstance('financial-statement-account-grouping')
