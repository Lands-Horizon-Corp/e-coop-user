import type { IGeneralLedger } from '@e-coop-monorepo/modules/general-ledger'
import type { TPaymentMode } from '@e-coop-monorepo/modules/quick-transfer'
import type { TEntityId } from '@e-coop-monorepo/shared/types'
import { create } from 'zustand'

type TData = {
    generalLedger?: IGeneralLedger
    generalLedgerId?: TEntityId
    mode: TPaymentMode
}

interface TTransactionData {
    generalLedger?: IGeneralLedger
    generalLedgerId?: TEntityId
    onOpen: (data: TData) => void
    open: boolean
    onClear: () => void
    onOpenChange: (newState: boolean) => void
    mode: TPaymentMode
}

export const usePaymentOnSuccessStore = create<TTransactionData>((set) => ({
    generalLedger: undefined,
    open: false,
    mode: 'payment',
    onOpen: (data: TData) =>
        set({
            generalLedger: data.generalLedger,
            open: true,
            generalLedgerId: data.generalLedger?.id,
            mode: data.mode,
        }),
    onClear: () =>
        set({
            generalLedger: undefined,
            generalLedgerId: undefined,
            open: false,
            mode: 'payment',
        }),
    onOpenChange: (newState: boolean) => set({ open: newState }),
}))
