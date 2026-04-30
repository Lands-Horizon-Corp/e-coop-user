import type { IUserBase } from '@e-coop-monorepo/modules/user'
import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/repositories'
import { createMutationFactory } from '@e-coop-monorepo/shared/repositories'

import type {
    IUserProfileGeneralRequest,
    IUserProfilePhotoUpdateRequest,
    IUserProfileRequest,
    IUserProfileSecurityRequest,
} from './user-profile.types'

const { apiCrudService } = createDataLayerFactory({
    url: '/api/v1/profile',
    baseKey: 'user-profile',
})

// ⚙️🛠️ API SERVICE STARTS HERE

const { API, route } = apiCrudService
// Update general user profile settings
export const updateUserProfileGeneral = async (
    data: IUserProfileGeneralRequest
): Promise<IUserBase> => {
    const res = await API.put<IUserProfileGeneralRequest, IUserBase>(
        `${route}/general`,
        data
    )
    return res.data
}

// Update user profile details
export const updateUserProfile = async (
    data: IUserProfileRequest
): Promise<IUserBase> => {
    const res = await API.put<IUserProfileRequest, IUserBase>(`${route}`, data)
    return res.data
}

// Update user security settings
export const updateUserProfileSecurity = async (
    data: IUserProfileSecurityRequest
): Promise<IUserBase> => {
    const res = await API.put<IUserProfileSecurityRequest, IUserBase>(
        `${route}/password`,
        data
    )
    return res.data
}

// Update user profile photo
export const updateUserProfilePhoto = async (
    data: IUserProfilePhotoUpdateRequest
): Promise<IUserBase> => {
    const res = await API.put<IUserProfilePhotoUpdateRequest, IUserBase>(
        `${route}/profile-picture`,
        data
    )
    return res.data
}

// 🪝 HOOK STARTS HERE

// Update general user profile settings
export const useUpdateUserProfileGeneral = createMutationFactory<
    IUserBase,
    Error,
    IUserProfileGeneralRequest
>({
    mutationFn: updateUserProfileGeneral,
})

// Update user profile details
export const useUpdateUserProfile = createMutationFactory<
    IUserBase,
    Error,
    IUserProfileRequest
>({
    mutationFn: updateUserProfile,
})

// Update user security settings
export const useUpdateUserProfileSecurity = createMutationFactory<
    IUserBase,
    Error,
    IUserProfileSecurityRequest
>({
    mutationFn: updateUserProfileSecurity,
})

// Update user profile photo
export const useUpdateUserProfilePhoto = createMutationFactory<
    IUserBase,
    Error,
    IUserProfilePhotoUpdateRequest
>({
    mutationFn: updateUserProfilePhoto,
})

export const logger = Logger.getInstance('user-profile')
