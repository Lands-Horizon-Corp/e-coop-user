import { Logger } from '@e-coop-monorepo/shared/helpers'
from '@e-coop-monorepo/shared/repositories'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/repositories'

import type {
    IBranchSettings,
    IBranchSettingsCurrencyRequest,
    IBranchSettingsRequest,
} from '../branch-settings'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: branchSettingsBaseKey,
} = createDataLayerFactory<IBranchSettings, IBranchSettingsRequest>({
    url: '/api/v1/branch-settings',
    baseKey: 'branch-settings',
})

// ⚙️🛠️ API SERVICE HERE
export const {
    API, // rarely used, for raw calls
    route: branchSettingsAPIRoute, // matches url above

    create: createBranchSettings,
    updateById: updateBranchSettingsById,

    deleteById: deleteBranchSettingsById,
    deleteMany: deleteManyBranchSettings,

    getById: getBranchSettingsById,
    getAll: getAllBranchSettings,
    getPaginated: getPaginatedBranchSettings,
} = apiCrudService

// custom service functions can go here

export const updateCurrentBranchSettings = async (
    data: IBranchSettingsRequest
) => {
    const response = await API.put<IBranchSettingsRequest, IBranchSettings>(
        branchSettingsAPIRoute,
        data
    )
    return response.data
}

// 🪝 HOOK STARTS HERE
export { branchSettingsBaseKey } // Exported in case it's needed outside

export const {
    useCreate: useCreateBranchSettings,
    useUpdateById: useUpdateBranchSettingsById,

    useGetAll: useGetAllBranchSettings,
    useGetById: useGetBranchSettingsById,
    useGetPaginated: useGetPaginatedBranchSettings,

    useDeleteById: useDeleteBranchSettingsById,
    useDeleteMany: useDeleteManyBranchSettings,
} = apiCrudHooks

// custom hooks can go here

export const useUpdateCurrentBranchSettings = createMutationFactory<
    IBranchSettings,
    Error,
    IBranchSettingsRequest
>({
    mutationFn: (data) => updateCurrentBranchSettings(data),
    invalidationFn: (args) =>
        updateMutationInvalidationFn('branch-settings', args),
    defaultInvalidates: [['auth', 'context']],
})

//  For branch settings currency

export const useUpdateBranchSettingsCurrency = createMutationFactory<
    IBranchSettings,
    Error,
    IBranchSettingsCurrencyRequest
>({
    mutationFn: async (data) => {
        const response = await API.put<
            IBranchSettingsCurrencyRequest,
            IBranchSettings
        >(`${branchSettingsAPIRoute}/currency`, data)
        return response.data
    },
    invalidationFn: (args) =>
        updateMutationInvalidationFn('branch-settings', args),
})

export const logger = Logger.getInstance('branch-settings')
