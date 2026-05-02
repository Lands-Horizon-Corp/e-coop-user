import { useMutation } from '@tanstack/react-query'

import { memberProfileAPIRoute } from '@ecoop/modules/member-profile'
import type { IMemberProfile } from '@ecoop/modules/member-profile'
import { Logger } from '@ecoop/shared/helpers'
import type { HookMutationOptions } from '@ecoop/shared/repositories'
import { createDataLayerFactory } from '@ecoop/shared/repositories'
import type { TEntityId } from '@ecoop/shared/types'

import type {
    IMemberCloseRemark,
    IMemberCloseRemarkRequest,
} from './member-close-remark.types'

const { apiCrudHooks, apiCrudService } = createDataLayerFactory<
    IMemberCloseRemark,
    IMemberCloseRemarkRequest
>({
    url: '/api/v1/member-close-remark',
    baseKey: 'member-close-remark',
})

// ⚙️🛠️ API SERVICE HERE
export const { API } = apiCrudService

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

// Custom Hook for Closing Member Profile
export const useCloseMemberProfile = ({
    options,
}: {
    options?: HookMutationOptions<
        IMemberProfile,
        Error,
        { profileId: TEntityId; data: IMemberCloseRemarkRequest[] }
    >
} = {}) => {
    return useMutation<
        IMemberProfile,
        Error,
        { profileId: TEntityId; data: IMemberCloseRemarkRequest[] }
    >({
        ...options,
        meta: {
            invalidates: [['member-profile']],
        },
        mutationFn: async ({ profileId, data }) => {
            const response = await API.post<
                IMemberCloseRemarkRequest[],
                IMemberProfile
            >(`${memberProfileAPIRoute}/${profileId}/close`, data)
            return response.data
        },
    })
}

export const logger = Logger.getInstance('member-close-remark')
