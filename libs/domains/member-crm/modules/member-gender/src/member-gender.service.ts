import type {
    IMemberGender,
    IMemberGenderRequest,
} from '@ecoop/domains/member-crm/models'
import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

const { apiCrudHooks, apiCrudService } = createDataLayerFactory<
    IMemberGender,
    IMemberGenderRequest
>({
    url: '/api/v1/member-gender',
    baseKey: 'member-gender',
})

// ⚙️🛠️ API SERVICE HERE
export const MemberGenderAPI = apiCrudService

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

export const logger = Logger.getInstance('member-gender')
