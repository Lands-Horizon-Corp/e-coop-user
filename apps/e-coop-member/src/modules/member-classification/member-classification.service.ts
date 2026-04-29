import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/repositories'

import type {
    IMemberClassification,
    IMemberClassificationRequest,
} from './member-classification.types'

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
