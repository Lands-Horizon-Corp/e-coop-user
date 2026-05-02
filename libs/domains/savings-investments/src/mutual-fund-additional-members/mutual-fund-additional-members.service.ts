import { Logger } from '@ecoop/shared/helpers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

import type {
    IMutualFundAdditionalMembers,
    IMutualFundAdditionalMembersRequest,
} from './mutual-fund-additional-members.types'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: mutualFundAdditionalMembersBaseKey,
} = createDataLayerFactory<
    IMutualFundAdditionalMembers,
    IMutualFundAdditionalMembersRequest
>({
    url: '/api/v1/mutual-fund-additional-members',
    baseKey: 'mutual-fund-additional-members',
})

// ⚙️🛠️ API SERVICE HERE
export const {
    API, // rarely used, for raw calls
    route: mutualFundAdditionalMembersAPIRoute, // matches url above

    create: createMutualFundAdditionalMembers,
    updateById: updateMutualFundAdditionalMembersById,

    deleteById: deleteMutualFundAdditionalMembersById,
    deleteMany: deleteManyMutualFundAdditionalMembers,

    getById: getMutualFundAdditionalMembersById,
    getAll: getAllMutualFundAdditionalMembers,
    getPaginated: getPaginatedMutualFundAdditionalMembers,
} = apiCrudService

// custom service functions can go here

// 🪝 HOOK STARTS HERE
export { mutualFundAdditionalMembersBaseKey } // Exported in case it's needed outside

export const {
    useCreate: useCreateMutualFundAdditionalMembers,
    useUpdateById: useUpdateMutualFundAdditionalMembersById,

    useGetAll: useGetAllMutualFundAdditionalMembers,
    useGetById: useGetMutualFundAdditionalMembersById,
    useGetPaginated: useGetPaginatedMutualFundAdditionalMembers,

    useDeleteById: useDeleteMutualFundAdditionalMembersById,
    useDeleteMany: useDeleteManyMutualFundAdditionalMembers,
} = apiCrudHooks

export const logger = Logger.getInstance('mutual-fund-additional-members')
// custom hooks can go here
