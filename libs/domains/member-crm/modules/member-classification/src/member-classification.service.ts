import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

import type {
    IMemberClassification,
    IMemberClassificationRequest,
} from '@ecoop/member-crm/models'

const { apiCrudHooks, apiCrudService } = createDataLayerFactory<
    IMemberClassification,
    IMemberClassificationRequest
>({
    url: '/api/v1/member-classification',
    baseKey: 'member-classification',
})

// ⚙️🛠️ API SERVICE HERE
export const MemberClassificationAPI = apiCrudService

// 🪝 HOOK STARTS HERE
export const {
    useCreate,
    useDeleteById,
    useDeleteMany,
    useGetAll,
    useGetById,
    useGetPaginated,
    useUpdateById,
} = apiCrudHooks

export const logger = Logger.getInstance('member-classification')
