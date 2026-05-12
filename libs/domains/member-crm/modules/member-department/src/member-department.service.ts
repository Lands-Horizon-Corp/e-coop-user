import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

import type {
    IMemberDepartment,
    IMemberDepartmentRequest,
} from '@ecoop/member-crm/models'

const { apiCrudHooks, apiCrudService } = createDataLayerFactory<
    IMemberDepartment,
    IMemberDepartmentRequest
>({
    url: '/api/v1/member-department',
    baseKey: 'member-department',
})

// ⚙️🛠️ API SERVICE HERE
export const MemberDepartmentAPI = apiCrudService

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

export const logger = Logger.getInstance('member-department')
