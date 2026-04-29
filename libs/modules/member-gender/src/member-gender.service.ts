import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/repositories'

import type { IMemberGender, IMemberGenderRequest } from './member-gender.types'

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
