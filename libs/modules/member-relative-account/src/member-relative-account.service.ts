import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/providers'
import { createMutationFactory } from '@e-coop-monorepo/shared/providers'
import { TEntityId } from '@e-coop-monorepo/shared/types'

import type {
    IMemberRelativeAccount,
    IMemberRelativeAccountRequest,
} from './member-relative-account.types'

// Create the base data layer factory
const { apiCrudHooks, apiCrudService } = createDataLayerFactory<
    IMemberRelativeAccount,
    IMemberRelativeAccountRequest
>({
    url: '/api/v1/member-relative-account',
    baseKey: 'member-relative-account',
})

// ⚙️🛠️ API SERVICE HERE
export const MemberRelativeAccountAPI = apiCrudService

// Custom API for creating a member relative account
export const createMemberRelativeAccount = async (
    memberProfileId: TEntityId,
    data: Omit<IMemberRelativeAccountRequest, 'member_profile_id'>
) => {
    const url = `/api/v1/member-relative-account/member-profile/${memberProfileId}`
    const response = await MemberRelativeAccountAPI.API.post<
        Omit<IMemberRelativeAccountRequest, 'member_profile_id'>,
        IMemberRelativeAccount
    >(url, data)
    return response.data
}

// Custom API for updating a member relative account
export const updateMemberRelativeAccount = async (
    relativeAccountId: TEntityId,
    data: Omit<IMemberRelativeAccountRequest, 'member_profile_id'>
) => {
    const url = `/api/v1/member-relative-account/${relativeAccountId}`
    const response = await MemberRelativeAccountAPI.API.put<
        Omit<IMemberRelativeAccountRequest, 'member_profile_id'>,
        IMemberRelativeAccount
    >(url, data)
    return response.data
}

// Custom API for deleting a member relative account
export const deleteMemberRelativeAccount = async (
    relativeAccountId: TEntityId
) => {
    const url = `/api/v1/member-relative-account/${relativeAccountId}`
    await MemberRelativeAccountAPI.API.delete(url)
}

// 🪝 HOOKS START HERE
export const {
    useCreate,
    useDeleteById,
    useDeleteMany,
    useGetAll,
    useGetById,
    useGetPaginated,
    useUpdateById,
} = apiCrudHooks

// 🪝 Custom Hook for Creating Member Relative Account
export const useCreateMemberRelativeAccount = createMutationFactory<
    IMemberRelativeAccount,
    Error,
    {
        memberProfileId: TEntityId
        data: Omit<IMemberRelativeAccountRequest, 'member_profile_id'>
    }
>({
    mutationFn: ({ memberProfileId, data }) =>
        createMemberRelativeAccount(memberProfileId, data),
    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: ['member-profile', args.variables.memberProfileId],
        })
    },
})

// 🪝 Custom Hook for Updating Member Relative Account
export const useUpdateMemberRelativeAccount = createMutationFactory<
    IMemberRelativeAccount,
    Error,
    {
        memberProfileId: TEntityId
        relativeAccountId: TEntityId
        data: Omit<IMemberRelativeAccountRequest, 'member_profile_id'>
    }
>({
    mutationFn: ({ relativeAccountId, data }) =>
        updateMemberRelativeAccount(relativeAccountId, data),
    defaultInvalidates: [],
    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: ['member-profile', args.variables.memberProfileId],
        })
    },
})

// 🪝 Custom Hook for Deleting Member Relative Account
export const useDeleteMemberRelativeAccount = createMutationFactory<
    unknown,
    Error,
    { memberProfileId: TEntityId; relativeAccountId: TEntityId }
>({
    mutationFn: ({ relativeAccountId }) =>
        deleteMemberRelativeAccount(relativeAccountId),
    defaultInvalidates: [],
    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: ['member-profile', args.variables.memberProfileId],
        })
    },
})

export const logger = Logger.getInstance('member-relative-account')
