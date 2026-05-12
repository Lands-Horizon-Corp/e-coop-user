import type {
    IFinancialStatementDefinition,
    IFinancialStatementDefinitionRequest,
} from '@ecoop/domains/accounting/models'
import type { ConnectAccountType } from '@ecoop/domains/accounting/models'
import { createGLSFSService } from '@ecoop/domains/accounting/modules/gl-fs'
import { Logger } from '@ecoop/shared/loggers'

export const {
    useCreate,
    useGetAll,
    useGetById,
    useDeleteById,
    useUpdateById,
    useUpdateIndex,
    useConnectAccount,
} = createGLSFSService<
    IFinancialStatementDefinition,
    IFinancialStatementDefinitionRequest,
    ConnectAccountType
>({
    url: '/api/v1/financial-statement-definition',
    baseKey: 'financial-statement-definition',
    connectAccountMutationKey:
        'connect-account-to-financial-statement-definition',
    updateIndexMutationKey: 'update-financial-statement-index',
})

export {
    useUpdateIndex as useFinancialStatementUpdateIndex,
    useConnectAccount as useConnectAccountToFinancialStatementDefinition,
}

export const logger = Logger.getInstance('financial-statement-definition')
