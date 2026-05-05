import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

import type { IMemberCenter, IMemberCenterRequest } from './member-center.types'

const { apiCrudHooks, apiCrudService } = createDataLayerFactory<
    IMemberCenter,
    IMemberCenterRequest
>({
    url: '/api/v1/member-center',
    baseKey: 'member-center',
})

// ⚙️🛠️ API SERVICE HERE
export const MemberCenterAPI = apiCrudService

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

export const logger = Logger.getInstance('member-center')
