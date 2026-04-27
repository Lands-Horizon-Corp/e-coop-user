import { IGeneralLedgerAccountGrouping, IGeneralLedgerAccountGroupingRequest } from './general-ledger-account-grouping.types';
import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/providers'

const { apiCrudHooks } = createDataLayerFactory<
    IGeneralLedgerAccountGrouping,
    IGeneralLedgerAccountGroupingRequest
>({
    url: '/api/v1/general-ledger-accounts-grouping',
    baseKey: 'gl-accounts-grouping',
})

export const { useGetAll, useUpdateById } = apiCrudHooks

export const logger = Logger.getInstance('general-ledger-account-grouping')
