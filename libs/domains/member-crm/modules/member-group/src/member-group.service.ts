import type {
    IMemberGroup,
    IMemberGroupRequest,
} from '@ecoop/domains/member-crm/models'
import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

const { apiCrudHooks, apiCrudService } = createDataLayerFactory<
    IMemberGroup,
    IMemberGroupRequest
>({
    url: '/api/v1/member-group',
    baseKey: 'member-group',
})

// ⚙️🛠️ API SERVICE HERE
export const MemberGroupAPI = apiCrudService

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

export const logger = Logger.getInstance('member-group')
