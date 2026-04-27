import { useQuery } from '@tanstack/react-query'

import { memberTypeBaseQueryKey } from '@e-coop-monorepo/modules/member-type'
import { Logger } from '@e-coop-monorepo/shared/helpers'
import {
    HookQueryOptions,
    createDataLayerFactory,
} from '@e-coop-monorepo/shared/providers'
import {
    createMutationFactory,
    deleteMutationInvalidationFn,
} from '@e-coop-monorepo/shared/providers'
import { TEntityId } from '@e-coop-monorepo/shared/types'

import type {
    IBrowseReference,
    IBrowseReferencePaginated,
    IBrowseReferenceRequest,
} from './browse-reference.types'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: browseReferenceBaseKey,
} = createDataLayerFactory<IBrowseReference, IBrowseReferenceRequest>({
    url: '/api/v1/browse-reference',
    baseKey: 'browse-reference',
})

// ⚙️🛠️ API SERVICE HERE
// Expose API for custom queries
export const {
    API,
    create: createBrowseReference,
    route: browseReferenceAPIRoute,
    getPaginated: getPaginatedBrowseReference,
    deleteById: deleteBrowseReferenceById,
} = apiCrudService

// 🪝 HOOK STARTS HERE
// Expose CRUD hooks
export const {
    // useCreate: useCreateBrowseReference,
    // useDeleteById: useDeleteBrowseReferenceById,
    useDeleteMany: useDeleteManyBrowseReferences,
    useGetAll: useGetAllBrowseReferences,
    useGetById: useGetBrowseReferenceById,
    useUpdateById: useUpdateBrowseReferenceById,
} = apiCrudHooks

export const useDeleteBrowseReferenceById = createMutationFactory<
    void,
    Error,
    TEntityId
>({
    mutationFn: (id) => deleteBrowseReferenceById({ id }),
    defaultInvalidates: [
        [browseReferenceBaseKey, 'paginated'],
        [browseReferenceBaseKey, 'all'],
        [memberTypeBaseQueryKey, 'all'],
    ],
    invalidationFn: (args) => {
        deleteMutationInvalidationFn(browseReferenceBaseKey, args)
    },
})

export const useCreateBrowseReference = createMutationFactory<
    IBrowseReference,
    Error,
    IBrowseReferenceRequest
>({
    mutationFn: (payload) => createBrowseReference({ payload }),
    defaultInvalidates: [
        [browseReferenceBaseKey, 'paginated'],
        [browseReferenceBaseKey, 'all'],
        [memberTypeBaseQueryKey, 'all'],
    ],
})

// Custom hook for filtered and paginated member type references
export type TBrowseReferenceFetchMode = 'all' | 'specific'

export const useFilteredPaginatedBrowseReference = ({
    browseReferenceId,
    mode = 'all',
    options,
    query,
}: {
    browseReferenceId?: TEntityId
    mode?: TBrowseReferenceFetchMode
    query?: Record<string, unknown>
    options?: HookQueryOptions<IBrowseReferencePaginated, Error>
}) => {
    return useQuery<IBrowseReferencePaginated, Error>({
        ...options,
        queryKey: [
            browseReferenceBaseKey,
            'filtered-paginated',
            mode,
            browseReferenceId,
            query,
        ],
        queryFn: async () => {
            let url: string | undefined

            if (mode === 'specific' && browseReferenceId) {
                url = `member-type/${browseReferenceId}/search`
            }

            return getPaginatedBrowseReference<IBrowseReference>({
                url: url ? `${browseReferenceAPIRoute}/${url}` : undefined,
                query,
            })
        },
    })
}

export const useGetBrowseReferenceByAccountMemberType = ({
    options,
    accountId,
    memberTypeId,
}: {
    accountId: TEntityId
    memberTypeId: TEntityId
    options?: HookQueryOptions<IBrowseReference, Error>
}) => {
    return useQuery<IBrowseReference, Error>({
        ...options,
        queryKey: [
            browseReferenceBaseKey,
            'account',
            accountId,
            'member-type',
            memberTypeId,
        ],
        queryFn: async () => {
            const response = await API.get<IBrowseReference>(
                `${browseReferenceAPIRoute}/account/${accountId}/member-type/${memberTypeId}`
            )

            return response.data
        },
    })
}

export const logger = Logger.getInstance('browse-reference')
