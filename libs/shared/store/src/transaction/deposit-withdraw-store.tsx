import type { Dispatch, SetStateAction } from 'react'

import type { IAccount } from '@ecoop/modules/account'
import type { IMemberProfile } from '@ecoop/modules/member-profile'
import { create } from 'zustand'

export interface DepositWithdrawStore {
    selectedMember: IMemberProfile | null
    openMemberPicker: boolean
    selectedAccount?: IAccount
    handleReset: () => void
    setOpenMemberPicker: Dispatch<SetStateAction<boolean>>
    setSelectedMember: (member: IMemberProfile | null) => void
    setSelectedAccount: (accountId?: IAccount) => void
}

export const useDepositWithdrawStore = create<DepositWithdrawStore>(
    (set, get) => ({
        selectedMember: null,
        openMemberPicker: false,
        selectedAccount: undefined,
        setSelectedMember: (member) => set({ selectedMember: member }),
        setOpenMemberPicker: (open) =>
            set({
                openMemberPicker:
                    typeof open === 'function'
                        ? open(get().openMemberPicker)
                        : open,
            }),
        setSelectedAccount: (account) =>
            set({
                selectedAccount: account,
            }),
        handleReset: () => {
            set({ selectedMember: null, selectedAccount: undefined })
        },
    })
)
