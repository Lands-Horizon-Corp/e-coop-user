import type { ConnectAccountType } from '@ecoop/modules/gl-fs'
import { createGLSFSService } from '@ecoop/modules/gl-fs'
import { Logger } from '@ecoop/shared/helpers'

import type {
    IGeneralLedgerDefinition,
    IGeneralLedgerDefinitionRequest,
} from './general-ledger-definition.types'

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
