import { useQuery } from '@tanstack/react-query'

import type { ICategory } from '@ecoop/platforms/category'
import { Logger } from '@ecoop/shared/loggers'
import type { HookQueryOptions } from '@ecoop/shared/repositories'
import { createDataLayerFactory } from '@ecoop/shared/repositories'
import {
    createMutationFactory,
    updateMutationInvalidationFn,
} from '@ecoop/shared/repositories'
import type { TEntityId } from '@ecoop/shared/types'

import type {
    IOrganization,
    IOrganizationEditRequest,
    IOrganizationRequest,
    IOrganizationWithPolicies,
} from './organization.types'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: organizationBaseKey,
} = createDataLayerFactory<IOrganization, IOrganizationRequest>({
    url: 'api/v1/organization',
    baseKey: 'organization',
})

const {
    useCreate: useCreateOrganization,
    // useUpdateById: useUpdateOrganization,
    useGetById: useGetOrganizationById,
    useGetAll,
} = apiCrudHooks

const {
    getById: getOrganizationById,
    updateById: updateOrganizationById,
    route,
    API,
} = apiCrudService

export {
    useCreateOrganization,
    useGetAll,
    apiCrudHooks,
    apiCrudService,
    useGetOrganizationById,
}

interface Options<TData = IOrganization[]> {
    options?: HookQueryOptions<TData>
}

export const useGetAllOrganizations = ({
    options,
}: Options<IOrganization[]> = {}) => {
    return useQuery<IOrganization[]>({
        queryKey: ['organization', 'resource', 'all'],
        queryFn: async () => {
            return API.get<IOrganization[]>(route).then((res) => res.data)
        },
        ...options,
    })
}

export const useUpdateOrganization = createMutationFactory<
    IOrganization,
    Error,
    { id: TEntityId; payload: IOrganizationRequest | IOrganizationEditRequest }
>({
    mutationFn: (variables) =>
        updateOrganizationById({
            id: variables.id,
            payload: variables.payload,
        }),
    invalidationFn: (args) =>
        updateMutationInvalidationFn(organizationBaseKey, args),
})

export const useGetOrganizationWithPoliciesById = ({
    options,
    organizationId,
}: Options<IOrganizationWithPolicies> & { organizationId: TEntityId }) => {
    return useQuery<IOrganizationWithPolicies, Error>({
        queryKey: ['organization', 'current', organizationId],
        queryFn: () => getOrganizationById({ id: organizationId }),
        ...options,
    })
}

export const useGetAllOrganizationsExplore = ({
    mode,
    options,
}: {
    mode: 'featured' | 'recently'
    options?: HookQueryOptions<IOrganization[]>
}) => {
    return useQuery<IOrganization[]>({
        queryKey: ['organization', 'resource', mode],
        queryFn: async () => {
            return API.get<IOrganization[]>(`${route}/${mode}`).then(
                (res) => res.data
            )
        },
        ...options,
    })
}

export type TGetAllByCategory = {
    category: ICategory
    organizations: IOrganization[]
    _searchStats?: {
        originalCount: number
        filteredCount: number
        hasResults: boolean
    }
}

export const useGetAllOrganizationsByCategories = ({
    options,
}: {
    options?: HookQueryOptions<TGetAllByCategory[]>
} = {}) => {
    return useQuery<TGetAllByCategory[]>({
        queryKey: ['organization', 'resource', 'category'],
        queryFn: async () => {
            return API.get<TGetAllByCategory[]>(`${route}/category`).then(
                (res) => res.data
            )
        },
        ...options,
    })
}

export const logger = Logger.getInstance('organization')
