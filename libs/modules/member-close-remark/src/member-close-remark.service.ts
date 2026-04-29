import { useMutation } from '@tanstack/react-query'

import { memberProfileAPIRoute } from '@e-coop-monorepo/modules/member-profile'
import type { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import { Logger } from '@e-coop-monorepo/shared/helpers'
import { HookMutationOptions } from '@e-coop-monorepo/shared/providers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/repositories'
import { TEntityId } from '@e-coop-monorepo/shared/types'

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
