import type {
    IMemberProfile} from '@e-coop-monorepo/modules/member-profile';
import {
    apiCrudService,
    memberProfileBaseKey,
} from '@e-coop-monorepo/modules/member-profile'
import { Logger } from '@e-coop-monorepo/shared/helpers'
import {
    createMutationFactory,
    createMutationInvalidateFn,
    updateMutationInvalidationFn,
} from '@e-coop-monorepo/shared/providers'
import type { TEntityId } from '@e-coop-monorepo/shared/types'

import type { IMemberProfileUserAccountRequest } from './member-user-account.types'

const { API, route } = apiCrudService

// ⚙️🛠️ API SERVICE HERE
// Connect Member Profile to User Account
export const connectMemberProfileToUserAccount = async (
    memberProfileId: TEntityId,
    userId: TEntityId
) => {
    const response = await API.put<void, IMemberProfile>(
        `${route}/${memberProfileId}/connect-user/${userId}`
    )
    return response.data
}

// Disconnect Member Profile from User Account
export const disconnectMemberProfileUserAccount = async ({
    id,
}: {
    id: TEntityId
}) => {
    const response = await API.put<void, IMemberProfile>(
        `${route}/${id}/disconnect`
    )
    return response.data
}

// Create Member Profile User Account
export const createMemberProfileUserAccount = async (
    memberProfileId: TEntityId,
    data: IMemberProfileUserAccountRequest
) => {
    const response = await API.post<
        IMemberProfileUserAccountRequest,
        IMemberProfile
    >(`${route}/${memberProfileId}/user-account`, data)
    return response.data
}

// Update Member Profile User Account
export const updateMemberProfileUserAccount = async (
    userId: TEntityId,
    data: IMemberProfileUserAccountRequest
) => {
    const response = await API.put<
        IMemberProfileUserAccountRequest,
        IMemberProfile
    >(`${route}/user-account/${userId}`, data)
    return response.data
}

// 🪝 HOOK STARTS HERE
// 🪝 Custom Hook for Connecting Member Profile to User Account
export const useConnectMemberProfileToUserAccount = createMutationFactory<
    IMemberProfile,
    Error,
    { memberProfileId: TEntityId; userId: TEntityId }
>({
    mutationFn: async ({ memberProfileId, userId }) =>
        await connectMemberProfileToUserAccount(memberProfileId, userId),
    invalidationFn: (args) =>
        updateMutationInvalidationFn(memberProfileBaseKey, args),
})

// 🪝 Custom Hook for Disconnecting Member Profile User Account
export const useDisconnectMemberProfileUserAccount = createMutationFactory<
    IMemberProfile,
    Error,
    TEntityId
>({
    mutationFn: async (id) => await disconnectMemberProfileUserAccount({ id }),
    invalidationFn: (args) =>
        updateMutationInvalidationFn(memberProfileBaseKey, args),
})

// 🪝 Custom Hook for Creating Member Profile User Account
export const useCreateMemberProfileUserAccount = createMutationFactory<
    IMemberProfile,
    Error,
    {
        memberProfileId: TEntityId
        data: IMemberProfileUserAccountRequest
    }
>({
    mutationFn: ({ memberProfileId, data }) =>
        createMemberProfileUserAccount(memberProfileId, data),
    invalidationFn: (args) =>
        createMutationInvalidateFn(memberProfileBaseKey, args),
})

// 🪝 Custom Hook for Updating Member Profile User Account
export const useUpdateMemberProfileUserAccount = createMutationFactory<
    IMemberProfile,
    Error,
    {
        userId: TEntityId
        memberProfileId: TEntityId
        data: IMemberProfileUserAccountRequest
    }
>({
    mutationFn: ({ userId, data }) =>
        updateMemberProfileUserAccount(userId, data),
    invalidationFn: (args) =>
        updateMutationInvalidationFn(memberProfileBaseKey, args),
})

export const logger = Logger.getInstance('member-user-account')
