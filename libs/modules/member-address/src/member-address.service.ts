import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/repositories'
import { createMutationFactory } from '@e-coop-monorepo/shared/repositories'
import type { TEntityId } from '@e-coop-monorepo/shared/types'

import type {
    IMemberAddress,
    IMemberAddressRequest,
} from './member-address.types'

// Create the base data layer factory
const { apiCrudHooks, apiCrudService } = createDataLayerFactory<
    IMemberAddress,
    IMemberAddressRequest
>({
    url: '/api/v1/member-address',
    baseKey: 'member-address',
})

// ⚙️🛠️ API SERVICE HERE
export const MemberAddressAPI = apiCrudService

// Custom API for creating a member profile address
export const createMemberProfileAddress = async (
    memberProfileId: TEntityId,
    data: Omit<IMemberAddressRequest, 'member_profile_id'>
) => {
    const url = `/api/v1/member-address/member-profile/${memberProfileId}`
    const response = await MemberAddressAPI.API.post<
        Omit<IMemberAddressRequest, 'member_profile_id'>,
        IMemberAddress
    >(url, data)
    return response.data
}

// Custom API for updating a member profile address
export const updateMemberProfileAddress = async (
    memberAddressId: TEntityId,
    data: Omit<IMemberAddressRequest, 'member_profile_id'>
) => {
    const url = `/api/v1/member-address/${memberAddressId}`
    const response = await MemberAddressAPI.API.put<
        Omit<IMemberAddressRequest, 'member_profile_id'>,
        IMemberAddress
    >(url, data)
    return response.data
}

// Custom API for deleting a member profile address
export const deleteMemberProfileAddress = async (
    memberAddressId: TEntityId
) => {
    const url = `/api/v1/member-address/${memberAddressId}`
    await MemberAddressAPI.API.delete(url)
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

// 🪝 Custom Hook for Creating Member Profile Address
export const useCreateMemberProfileAddress = createMutationFactory<
    IMemberAddress,
    Error,
    {
        memberProfileId: TEntityId
        data: Omit<IMemberAddressRequest, 'member_profile_id'>
    }
>({
    mutationFn: ({ memberProfileId, data }) =>
        createMemberProfileAddress(memberProfileId, data),
    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: ['member-profile', args.variables.memberProfileId],
        })
    },
})

// 🪝 Custom Hook for Updating Member Profile Address
export const useUpdateMemberProfileAddress = createMutationFactory<
    IMemberAddress,
    Error,
    {
        memberProfileId: TEntityId
        memberAddressId: TEntityId
        data: Omit<IMemberAddressRequest, 'member_profile_id'>
    }
>({
    mutationFn: ({ memberAddressId, data }) =>
        updateMemberProfileAddress(memberAddressId, data),
    defaultInvalidates: [],
    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: ['member-profile', args.variables.memberProfileId],
        })
    },
})

// 🪝 Custom Hook for Deleting Member Profile Address
export const useDeleteMemberProfileAddress = createMutationFactory<
    unknown,
    Error,
    { memberProfileId: TEntityId; memberAddressId: TEntityId }
>({
    mutationFn: ({ memberAddressId }) =>
        deleteMemberProfileAddress(memberAddressId),
    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: ['member-profile', args.variables.memberProfileId],
        })
    },
})

export const logger = Logger.getInstance('member-address')
