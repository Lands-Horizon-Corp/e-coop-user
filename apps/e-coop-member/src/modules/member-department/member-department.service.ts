import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/providers'

import type {
    IMemberDepartment,
    IMemberDepartmentRequest,
} from './member-department.types'

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
