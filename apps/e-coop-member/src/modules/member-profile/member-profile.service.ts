import { createDataLayerFactory } from '@ecoop/shared/repositories'
import { createMutationFactory } from '@ecoop/shared/repositories'
import { useFakeStore } from '@ecoop/shared/store'
import type { TEntityId } from '@ecoop/shared/types'

import type {
    IMemberProfile,
    IMemberpRofileIdentityRequest,
} from './member-profile.types'

export const {
    apiCrudHooks,
    apiCrudService,
    baseQueryKey: memberProfileBaseKey,
} = createDataLayerFactory<IMemberProfile, {}>({
    url: '/api/v1/member-profile',
    baseKey: 'member-profile',
})

// ⚙️🛠️ API SERVICE HERE

export const { API } = apiCrudService

export const useUpdateMemberProfileIdentity = createMutationFactory<
    IMemberProfile,
    Error,
    { memberId: TEntityId; data: IMemberpRofileIdentityRequest }
>({
    mutationFn: async ({ memberId, data }) => {
        const { updateMember, authMember, setAuthMember } =
            useFakeStore.getState()

        // Update inside the members list
        updateMember(memberId, {
            ...data,
            updated_at: new Date().toISOString(),
        })

        // If the authenticated member is the one being updated, update it too
        if (authMember?.id === memberId) {
            setAuthMember({
                ...authMember,
                ...data,
                updated_at: new Date().toISOString(),
            })
        }

        // Return updated member (React Query expects return)
        const updated = useFakeStore
            .getState()
            .members.find((m) => m.id === memberId)

        if (!updated) {
            throw new Error('Member not found in fake store')
        }

        return updated
    },
})

export const useDeleteEducationalAttainment = createMutationFactory<
    void,
    string,
    { memberProfileId: TEntityId; educationalAttainmentId: TEntityId }
>({
    mutationFn: async ({ memberProfileId, educationalAttainmentId }) => {
        const { members, updateMember, authMember, setAuthMember } =
            useFakeStore.getState()

        // Find the member
        const member = members.find((m) => m.id === memberProfileId)
        if (!member) {
            throw new Error('Member not found in fake store')
        }

        // Remove the educational attainment
        const updatedEducationalAttainments = (
            member.member_educational_attainments || []
        ).filter((ea) => ea.id !== educationalAttainmentId)

        // Update the member in the store
        updateMember(memberProfileId, {
            member_educational_attainments: updatedEducationalAttainments,
            updated_at: new Date().toISOString(),
        })

        // If the updated member is also the authenticated member, update authMember
        if (authMember?.id === memberProfileId) {
            setAuthMember({
                ...authMember,
                member_educational_attainments: updatedEducationalAttainments,
                updated_at: new Date().toISOString(),
            })
        }
    },
})

export const useDeleteMemberGovernmentBenefit = createMutationFactory<
    void,
    string,
    { memberProfileId: TEntityId; benefitId: TEntityId }
>({
    mutationFn: async ({ memberProfileId, benefitId }) => {
        const { members, updateMember, authMember, setAuthMember } =
            useFakeStore.getState()

        // Find the member
        const member = members.find((m) => m.id === memberProfileId)
        if (!member) {
            throw new Error('Member not found in fake store')
        }

        // Remove the government benefit
        const updatedBenefits = (
            member.member_government_benefits || []
        ).filter((b) => b.id !== benefitId)

        // Update the member in the store
        updateMember(memberProfileId, {
            member_government_benefits: updatedBenefits,
            updated_at: new Date().toISOString(),
        })

        // Update authMember if it is the same member
        if (authMember?.id === memberProfileId) {
            setAuthMember({
                ...authMember,
                member_government_benefits: updatedBenefits,
                updated_at: new Date().toISOString(),
            })
        }
    },
})

export const useDeleteMemberProfileAsset = createMutationFactory<
    void,
    string,
    { memberProfileId: TEntityId; assetId: TEntityId }
>({
    mutationFn: async ({ memberProfileId, assetId }) => {
        const { members, updateMember, authMember, setAuthMember } =
            useFakeStore.getState()

        // Find the member
        const member = members.find((m) => m.id === memberProfileId)
        if (!member) {
            throw new Error('Member not found in fake store')
        }

        // Remove the asset
        const updatedAssets = (member.member_assets || []).filter(
            (a) => a.id !== assetId
        )

        // Update the member in the store
        updateMember(memberProfileId, {
            member_assets: updatedAssets,
            updated_at: new Date().toISOString(),
        })

        // Update authMember if it is the same member
        if (authMember?.id === memberProfileId) {
            setAuthMember({
                ...authMember,
                member_assets: updatedAssets,
                updated_at: new Date().toISOString(),
            })
        }
    },

    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: ['member-profile', args.variables.memberProfileId],
        })
    },
})

export const useDeleteMemberProfileExpense = createMutationFactory<
    void,
    string,
    { memberProfileId: TEntityId; expenseId: TEntityId }
>({
    mutationFn: async ({ memberProfileId, expenseId }) => {
        const { members, updateMember, authMember, setAuthMember } =
            useFakeStore.getState()

        // Find the member
        const member = members.find((m) => m.id === memberProfileId)
        if (!member) {
            throw new Error('Member not found in fake store')
        }

        // Remove the expense
        const updatedExpenses = (member.member_expenses || []).filter(
            (e) => e.id !== expenseId
        )

        // Update member in store
        updateMember(memberProfileId, {
            member_expenses: updatedExpenses,
            updated_at: new Date().toISOString(),
        })

        // Sync with authMember if the same member
        if (authMember?.id === memberProfileId) {
            setAuthMember({
                ...authMember,
                member_expenses: updatedExpenses,
                updated_at: new Date().toISOString(),
            })
        }
    },

    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: ['member-profile', args.variables.memberProfileId],
        })
    },
})

export const useDeleteMemberProfileIncome = createMutationFactory<
    void,
    string,
    { memberProfileId: TEntityId; incomeId: TEntityId }
>({
    mutationFn: async ({ memberProfileId, incomeId }) => {
        const { members, updateMember, authMember, setAuthMember } =
            useFakeStore.getState()

        // Find the member
        const member = members.find((m) => m.id === memberProfileId)
        if (!member) {
            throw new Error('Member not found in fake store')
        }

        // Remove the income entry
        const updatedIncomes = (member.member_incomes || []).filter(
            (i) => i.id !== incomeId
        )

        // Update member in the store
        updateMember(memberProfileId, {
            member_incomes: updatedIncomes,
            updated_at: new Date().toISOString(),
        })

        // Sync authMember if this is the authenticated user
        if (authMember?.id === memberProfileId) {
            setAuthMember({
                ...authMember,
                member_incomes: updatedIncomes,
                updated_at: new Date().toISOString(),
            })
        }
    },

    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: ['member-profile', args.variables.memberProfileId],
        })
    },
})

export const useDeleteMemberProfileAddress = createMutationFactory<
    void,
    string,
    { memberProfileId: TEntityId; memberAddressId: TEntityId }
>({
    mutationFn: async ({ memberProfileId, memberAddressId }) => {
        const { members, updateMember, authMember, setAuthMember } =
            useFakeStore.getState()

        // Find the member
        const member = members.find((m) => m.id === memberProfileId)
        if (!member) {
            throw new Error('Member not found in fake store')
        }

        // Remove the address
        const updatedAddresses = (member.member_addresses || []).filter(
            (a) => a.id !== memberAddressId
        )

        // Update member in the store
        updateMember(memberProfileId, {
            member_addresses: updatedAddresses,
            updated_at: new Date().toISOString(),
        })

        // Update authMember if it is the same member
        if (authMember?.id === memberProfileId) {
            setAuthMember({
                ...authMember,
                member_addresses: updatedAddresses,
                updated_at: new Date().toISOString(),
            })
        }
    },

    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: ['member-profile', args.variables.memberProfileId],
        })
    },
})

export const useDeleteMemberProfileContactReference = createMutationFactory<
    void,
    string,
    { memberProfileId: TEntityId; contactReferenceId: TEntityId }
>({
    mutationFn: async ({ memberProfileId, contactReferenceId }) => {
        const { members, updateMember, authMember, setAuthMember } =
            useFakeStore.getState()

        // Find the member
        const member = members.find((m) => m.id === memberProfileId)
        if (!member) {
            throw new Error('Member not found in fake store')
        }

        // Remove the contact reference
        const updatedReferences = (
            member.member_contact_references || []
        ).filter((c) => c.id !== contactReferenceId)

        // Update member in the store
        updateMember(memberProfileId, {
            member_contact_references: updatedReferences,
            updated_at: new Date().toISOString(),
        })

        // Update authMember if it is the same member
        if (authMember?.id === memberProfileId) {
            setAuthMember({
                ...authMember,
                member_contact_references: updatedReferences,
                updated_at: new Date().toISOString(),
            })
        }
    },

    invalidationFn: (args) => {
        args.queryClient.invalidateQueries({
            queryKey: ['member-profile', args.variables.memberProfileId],
        })
    },
})
