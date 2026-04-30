import {
    createMutationFactory,
    createMutationInvalidateFn,
} from '@e-coop-monorepo/shared/providers'
import { createAPIRepository } from '@e-coop-monorepo/shared/repositories'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/repositories'
import type {
    TEntityId,
    UdpateGeneralLedgerOrder,
} from '@e-coop-monorepo/shared/types'

import type { ConnectAccountType, CreateAPIProps } from './gl-fs.types'

export const createGLSFSService = <
    TResponse extends { id: TEntityId },
    TRequest,
    TConnectAccountPayload = ConnectAccountType,
>(
    config: CreateAPIProps
) => {
    const { url, baseKey, connectAccountMutationKey, updateIndexMutationKey } =
        config

    const { apiCrudHooks } = createDataLayerFactory<TResponse, TRequest>({
        url,
        baseKey,
    })

    const { API, route } = createAPIRepository<TResponse, TRequest>(url)

    const updateIndex = async (
        general_ledger_definition: UdpateGeneralLedgerOrder[]
    ): Promise<TResponse> => {
        const response = await API.put<UdpateGeneralLedgerOrder[], TResponse>(
            `${route}/order`,
            general_ledger_definition
        )
        return response.data
    }

    const connectAccount = async ({
        id,
        accountId,
    }: ConnectAccountType): Promise<TResponse> => {
        return (
            await API.post<TConnectAccountPayload, TResponse>(
                `${route}/${id}/account/${accountId}/connect`
            )
        ).data
    }

    const useUpdateIndex = createMutationFactory<
        TResponse,
        Error,
        UdpateGeneralLedgerOrder[]
    >({
        mutationFn: updateIndex,
        invalidationFn: (args) =>
            createMutationInvalidateFn(updateIndexMutationKey, args),
    })

    const useConnectAccount = createMutationFactory<
        TResponse,
        Error,
        ConnectAccountType
    >({
        mutationFn: connectAccount,
        invalidationFn: (args) =>
            createMutationInvalidateFn(connectAccountMutationKey, args),
    })

    return {
        ...apiCrudHooks,
        API,
        route,
        updateIndex,
        connectAccount,
        useUpdateIndex,
        useConnectAccount,
    }
}
