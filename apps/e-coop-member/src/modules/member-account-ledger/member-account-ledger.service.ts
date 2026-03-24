import { useQuery } from '@tanstack/react-query'

import type { IMemberAccountingLedger } from '@/modules/member-account-ledger'
import {
    HookQueryOptions,
    createDataLayerFactory,
} from '@/providers/repositories/data-layer-factory'

import { TEntityId } from '@/types'

const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: memberAccountLedgerBaseKey,
} = createDataLayerFactory<IMemberAccountingLedger, never>({
    url: '/api/v1/member-accounting-ledger',
    baseKey: 'member-account-ledger',
})

export const {
    API,
    route: memberAccountLedgerAPIRoute,

    create: createMemberAccountLedger,
    updateById: updateMemberAccountLedgerById,

    deleteById: deleteMemberAccountLedgerById,
    deleteMany: deleteManyMemberAccountLedger,

    getById: getMemberAccountLedgerById,
    getAll: getAllMemberAccountLedger,
    getPaginated: getPaginatedMemberAccountLedger,
} = apiCrudService

export { memberAccountLedgerBaseKey }

export const {
    useCreate: useCreateMemberAccountLedger,
    useUpdateById: useUpdateMemberAccountLedgerById,

    useGetAll: useGetAllMemberAccountLedger,
    useGetById: useGetMemberAccountLedgerById,
    useGetPaginated: useGetPaginatedMemberAccountLedger,

    useDeleteById: useDeleteMemberAccountLedgerById,
    useDeleteMany: useDeleteManyMemberAccountLedger,
} = apiCrudHooks

export const getMemberWallet = async (
    memberProfileId: TEntityId
): Promise<IMemberAccountingLedger> => {
    const response = await API.get<IMemberAccountingLedger>(
        `${apiCrudService.route}/member-profile/${memberProfileId}/wallet`
    )
    return response.data
}

export const useGetMemberWallet = ({
    memberProfileId,
    options,
}: {
    memberProfileId?: TEntityId
    options?: HookQueryOptions<IMemberAccountingLedger, Error>
}) => {
    return useQuery<IMemberAccountingLedger, Error>({
        queryKey: [
            memberAccountLedgerBaseKey,
            'member-wallet',
            memberProfileId,
        ],
        enabled: !!memberProfileId,
        queryFn: () => getMemberWallet(memberProfileId!),
        ...options,
    })
}
