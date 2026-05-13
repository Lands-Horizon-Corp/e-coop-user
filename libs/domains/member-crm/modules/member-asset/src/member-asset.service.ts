import type {
    IMemberAsset,
    IMemberAssetRequest,
} from '@ecoop/domains/member-crm/models'
import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'
import { createMutationFactory } from '@ecoop/shared/repositories'
import type { TEntityId } from '@ecoop/shared/types'

// Create the base data layer factory
const { apiCrudHooks, apiCrudService } = createDataLayerFactory<
    IMemberAsset,
    IMemberAssetRequest
>({
    url: '/api/v1/member-asset',
    baseKey: 'member-asset',
})

// ⚙️🛠️ API SERVICE HERE
export const MemberAssetAPI = apiCrudService

// Custom API for creating a member profile asset
export const createMemberProfileAsset = async (
    memberProfileId: TEntityId,
    data: Omit<IMemberAssetRequest, 'member_profile_id'>
) => {
    const url = `/api/v1/member-asset/member-profile/${memberProfileId}`
    const response = await MemberAssetAPI.API.post<
        Omit<IMemberAssetRequest, 'member_profile_id'>,
        IMemberAsset
    >(url, data)
    return response.data
}

// Custom API for updating a member profile asset
export const updateMemberProfileAsset = async (
    assetId: TEntityId,
    data: Omit<IMemberAssetRequest, 'member_profile_id'>
) => {
    const url = `/api/v1/member-asset/${assetId}`
    const response = await MemberAssetAPI.API.put<
        Omit<IMemberAssetRequest, 'member_profile_id'>,
        IMemberAsset
    >(url, data)
    return response.data
}

// Custom API for deleting a member profile asset
export const deleteMemberProfileAsset = async (assetId: TEntityId) => {
    const url = `/api/v1/member-asset/${assetId}`
    await MemberAssetAPI.API.delete(url)
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

// 🪝 Custom Hook for Creating Member Profile Asset
export const useCreateMemberProfileAsset = createMutationFactory<
    IMemberAsset,
    Error,
    {
        memberProfileId: TEntityId
        data: Omit<IMemberAssetRequest, 'member_profile_id'>
    }
>({
    mutationFn: ({ memberProfileId, data }) =>
        createMemberProfileAsset(memberProfileId, data),
    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: ['member-profile', args.variables.memberProfileId],
        })
    },
})

// 🪝 Custom Hook for Updating Member Profile Asset
export const useUpdateMemberProfileAsset = createMutationFactory<
    IMemberAsset,
    Error,
    {
        memberProfileId: TEntityId
        assetId: TEntityId
        data: Omit<IMemberAssetRequest, 'member_profile_id'>
    }
>({
    mutationFn: ({ assetId, data }) => updateMemberProfileAsset(assetId, data),
    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: ['member-profile', args.variables.memberProfileId],
        })
    },
})

// 🪝 Custom Hook for Deleting Member Profile Asset
export const useDeleteMemberProfileAsset = createMutationFactory<
    unknown,
    Error,
    { memberProfileId: TEntityId; assetId: TEntityId }
>({
    mutationFn: ({ assetId }) => deleteMemberProfileAsset(assetId),
    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: ['member-profile', args.variables.memberProfileId],
        })
    },
})

export const logger = Logger.getInstance('member-asset')
