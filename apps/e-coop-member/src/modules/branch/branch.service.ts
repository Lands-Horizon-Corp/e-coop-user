import { useMutation, useQuery } from '@tanstack/react-query'

import { IUserOrganization } from '@e-coop-monorepo/modules/user-organization'
import {
    HookQueryOptions,
    createDataLayerFactory,
} from '@e-coop-monorepo/shared/providers'
import { createMutationFactory } from '@e-coop-monorepo/shared/repositories'
import { TAPIQueryOptions, TEntityId } from '@e-coop-monorepo/shared/types'
import { getCurrentLocation, getDistance } from '@e-coop-monorepo/ui'

import { IBranch, IBranchRequest } from './branch.types'

/**
 * CRUD Factory
 */
const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: branchBaseQueryKey,
} = createDataLayerFactory<IBranch, IBranchRequest>({
    url: '/api/v1/branch',
    baseKey: 'branch',
})

const { route: branchBaseAPIRoute, API, getAll: getAllBranch } = apiCrudService

export const {
    // useGetAll: useGetAllBranches,
    useGetById: useGetBranchById,
    useDeleteById: useDeleteBranch,
    useUpdateById: useUpdateBranch,
} = apiCrudHooks

export const useGetAllBranch = ({
    mode = 'kyc',
    query,
    options,
}: {
    mode?: 'all' | 'kyc'
    query?: TAPIQueryOptions
    options?: HookQueryOptions<IBranch[], Error>
} = {}) => {
    return useQuery<IBranch[], Error>({
        ...options,
        queryKey: [branchBaseQueryKey, mode, query].filter(Boolean),
        queryFn: async () => {
            let url = `${branchBaseAPIRoute}`

            if (mode === 'kyc') url = `${branchBaseAPIRoute}/kyc`

            const response = await getAllBranch({
                url,
                query,
            })

            const loc = await getCurrentLocation()

            const sorted = response?.sort((a, b) => {
                const aDistance = getDistance(
                    a.longitude,
                    a.latitude,
                    loc.lng,
                    loc.lat
                )
                const bDistance = getDistance(
                    b.longitude,
                    b.latitude,
                    loc.lng,
                    loc.lat
                )

                return aDistance - bDistance
            })

            return sorted
        },
    })
}

// /api/v1/branch/kyc
export const getBranchesByOrganizationId = async (
    organizationId: TEntityId
) => {
    const endpoint = `${branchBaseAPIRoute}/organization/${organizationId}`
    return (await API.get<IBranch[]>(endpoint)).data
}

export const postBranchByOrganizationId = async (
    userOrganizationId: TEntityId
) => {
    const endpoint = `${branchBaseAPIRoute}/user-organization/${userOrganizationId}`
    return (await API.post<IUserOrganization, IUserOrganization>(endpoint)).data
}

/**
 * Hooks
 */
interface QueryOptions<TData = IBranch[]> {
    options?: HookQueryOptions<TData>
}

export const useCreateBranchByOrganizationId = createMutationFactory<
    IBranch,
    Error,
    { organizationId: TEntityId; payload: IBranchRequest }
>({
    mutationFn: async ({ organizationId, payload }) => {
        const endpoint = `${branchBaseAPIRoute}/organization/${organizationId}`
        return (await API.post<IBranchRequest, IBranch>(endpoint, payload)).data
    },
})

export const useGetBranchesByOrganizationId = ({
    organizationId,
    options,
}: { organizationId: TEntityId } & QueryOptions<IBranch[]>) => {
    return useQuery<IBranch[]>({
        queryKey: ['get-branches-by-organization-id', organizationId],
        queryFn: () => getBranchesByOrganizationId(organizationId),
        ...options,
        enabled: !!organizationId && (options?.enabled ?? true),
    })
}

export const usePostBranchByOrganizationId = () => {
    return useMutation<IUserOrganization, string, TEntityId>({
        mutationKey: ['branch', 'post-by-org'],
        mutationFn: postBranchByOrganizationId,
    })
}
