import { useMutation } from '@tanstack/react-query'

import type {
    IUserForgotPasswordRequest,
    IUserLoginRequest,
    IUserPasswordResetRequest,
} from '@ecoop/modules/auth'
import type { IMemberProfile, IQuickCreateMemberProfile } from '@ecoop/domains/member-crm'
import type { HookMutationOptions } from '@ecoop/shared/repositories'
import { createMutationFactory } from '@ecoop/shared/repositories'
import type { IForgetPasswordEntry } from '@ecoop/shared/store'
import { useFakeStore } from '@ecoop/shared/store'

// FAKE SIGN IN HOOK
export const useSignIn = ({
    options,
}: {
    options?: HookMutationOptions<IMemberProfile, Error, IUserLoginRequest>
} = {}) => {
    return useMutation<IMemberProfile, Error, IUserLoginRequest>({
        mutationFn: async ({ key, password }) => {
            const { setAuthMember, members } = useFakeStore.getState()

            const matchedMember = members.find((m) => m.key === key)

            if (!matchedMember) {
                throw new Error('Member not found')
            }

            if (matchedMember.password !== password) {
                throw new Error('Invalid credentials')
            }

            setAuthMember(matchedMember)
            return matchedMember
        },
        ...options,
    })
}

export const useQuickRegisterMember = createMutationFactory<
    IMemberProfile,
    Error,
    IQuickCreateMemberProfile
>({
    mutationFn: async (data) => {
        const { addMember } = useFakeStore.getState()

        // create new IMemberProfile
        const newMember: IMemberProfile = {
            ...data,
            id: crypto.randomUUID(),
            created_at: new Date(),
            updated_at: new Date(),
        } as unknown as IMemberProfile

        // add to store
        addMember(newMember)

        return newMember
    },

    invalidationFn: () => {},
})

export const useForgotPassword = ({
    options,
}: {
    options?: HookMutationOptions<
        IForgetPasswordEntry,
        Error,
        IUserForgotPasswordRequest
    >
} = {}) => {
    return useMutation<IForgetPasswordEntry, Error, IUserForgotPasswordRequest>(
        {
            mutationFn: async ({ key }) => {
                const { members, setForgetPasswordRequest } =
                    useFakeStore.getState()

                const member = members.find((m) => m.key === key)

                if (!member) {
                    throw new Error('Member not found')
                }

                const otp = Math.floor(
                    100000 + Math.random() * 900000
                ).toString()

                const request: IForgetPasswordEntry = {
                    id: crypto.randomUUID(),
                    memberProfileId: member.id,
                    otp,
                }
                setForgetPasswordRequest(request)

                return request
            },
            ...options,
        }
    )
}

export const useChangePassword = ({
    options,
}: {
    options?: HookMutationOptions<void, Error, IUserPasswordResetRequest>
} = {}) => {
    return useMutation<void, Error, IUserPasswordResetRequest>({
        mutationFn: async ({ reset_id, new_password, confirm_password }) => {
            const {
                members,
                forgetPasswordRequest,
                updateMember,
                setForgetPasswordRequest,
            } = useFakeStore.getState()

            // validate reset request
            if (
                !forgetPasswordRequest ||
                forgetPasswordRequest.id !== reset_id
            ) {
                throw new Error('Invalid or expired password reset request')
            }

            if (new_password !== confirm_password) {
                throw new Error('Passwords do not match')
            }

            // find the member
            const member = members.find(
                (m) => m.id === forgetPasswordRequest.memberProfileId
            )

            if (!member) {
                throw new Error('Member not found')
            }

            // update password
            updateMember(member.id, { password: new_password })

            // clear reset request
            setForgetPasswordRequest(null)
        },
        ...options,
    })
}

export const useSignOut = ({
    options,
}: {
    options?: HookMutationOptions<void, string, void>
} = {}) => {
    return useMutation<void, string, void>({
        mutationFn: async () => {
            const { setAuthMember } = useFakeStore.getState()

            // clear authenticated member
            setAuthMember(null)
        },
        ...options,
    })
}
