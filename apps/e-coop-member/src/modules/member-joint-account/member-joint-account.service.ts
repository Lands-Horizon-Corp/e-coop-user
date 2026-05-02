import { Logger } from '@ecoop/shared/helpers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'
import { createMutationFactory } from '@ecoop/shared/repositories'
import type { TEntityId } from '@ecoop/shared/types'

import type {
    IMemberJointAccount,
    IMemberJointAccountRequest,
} from './member-joint-account.types'

// Create the base data layer factory
const { apiCrudHooks, apiCrudService } = createDataLayerFactory<
    IMemberJointAccount,
    IMemberJointAccountRequest
>({
    url: '/api/v1/member-joint-account',
    baseKey: 'member-joint-account',
})

// ⚙️🛠️ API SERVICE HERE
export const MemberJointAccountAPI = apiCrudService

// Custom API for creating a member joint account
export const createMemberJointAccount = async (
    memberProfileId: TEntityId,
    data: Omit<IMemberJointAccountRequest, 'member_profile_id'>
) => {
    const url = `/api/v1/member-joint-account/member-profile/${memberProfileId}`
    const response = await MemberJointAccountAPI.API.post<
        Omit<IMemberJointAccountRequest, 'member_profile_id'>,
        IMemberJointAccount
    >(url, data)
    return response.data
}

// Custom API for updating a member joint account
export const updateMemberJointAccount = async (
    jointAccountId: TEntityId,
    data: Omit<IMemberJointAccountRequest, 'member_profile_id'>
) => {
    const url = `/api/v1/member-joint-account/${jointAccountId}`
    const response = await MemberJointAccountAPI.API.put<
        Omit<IMemberJointAccountRequest, 'member_profile_id'>,
        IMemberJointAccount
    >(url, data)
    return response.data
}

// Custom API for deleting a member joint account
export const deleteMemberJointAccount = async (jointAccountId: TEntityId) => {
    const url = `/api/v1/member-joint-account/${jointAccountId}`
    await MemberJointAccountAPI.API.delete(url)
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

// 🪝 Custom Hook for Creating Member Joint Account
export const useCreateMemberJointAccount = createMutationFactory<
    IMemberJointAccount,
    Error,
    {
        memberProfileId: TEntityId
        data: Omit<IMemberJointAccountRequest, 'member_profile_id'>
    }
>({
    mutationFn: ({ memberProfileId, data }) =>
        createMemberJointAccount(memberProfileId, data),
    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: ['member-profile', args.variables.memberProfileId],
        })
    },
})

// 🪝 Custom Hook for Updating Member Joint Account
export const useUpdateMemberJointAccount = createMutationFactory<
    IMemberJointAccount,
    Error,
    {
        memberProfileId: TEntityId
        jointAccountId: TEntityId
        data: Omit<IMemberJointAccountRequest, 'member_profile_id'>
    }
>({
    mutationFn: ({ jointAccountId, data }) =>
        updateMemberJointAccount(jointAccountId, data),
    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: ['member-profile', args.variables.memberProfileId],
        })
    },
})

// 🪝 Custom Hook for Deleting Member Joint Account
export const useDeleteMemberJointAccount = createMutationFactory<
    unknown,
    Error,
    { memberProfileId: TEntityId; jointAccountId: TEntityId }
>({
    mutationFn: ({ jointAccountId }) =>
        deleteMemberJointAccount(jointAccountId),
    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: ['member-profile', args.variables.memberProfileId],
        })
    },
})

export const logger = Logger.getInstance('member-joint-account')
