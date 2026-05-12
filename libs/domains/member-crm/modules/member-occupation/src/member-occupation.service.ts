import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

import type {
    IMemberOccupation,
    IMemberOccupationRequest,
} from '@ecoop/member-crm/models'

const { apiCrudHooks, apiCrudService } = createDataLayerFactory<
    IMemberOccupation,
    IMemberOccupationRequest
>({
    url: '/api/v1/member-occupation',
    baseKey: 'member-occupation',
})

// ⚙️🛠️ API SERVICE HERE
export const MemberOccupationAPI = apiCrudService

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

export const logger = Logger.getInstance('member-occupation')
