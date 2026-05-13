import type { ConnectAccountType } from '@ecoop/domains/accounting/models'
import type {
    IGeneralLedgerDefinition,
    IGeneralLedgerDefinitionRequest,
} from '@ecoop/domains/accounting/models'
import { Logger } from '@ecoop/shared/loggers'

import { createGLSFSService } from '../gl-fs/gl-fs.services'

export const {
    useCreate,
    useGetAll,
    useGetById,
    useDeleteById,
    useUpdateById,
    useUpdateIndex,
    useConnectAccount,
} = createGLSFSService<
    IGeneralLedgerDefinition,
    IGeneralLedgerDefinitionRequest,
    ConnectAccountType
>({
    url: '/api/v1/general-ledger-definition',
    baseKey: 'general-ledger-definition',
    connectAccountMutationKey: 'connect-account-to-general-ledger-definition',
    updateIndexMutationKey: 'update-general-ledger-index',
})

export const logger = Logger.getInstance('general-ledger-definition')
