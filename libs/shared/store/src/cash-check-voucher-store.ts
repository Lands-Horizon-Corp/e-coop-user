import type { ICashCheckVoucherEntryRequest } from '@ecoop/domains/transactions/models'
import type { TEntityId } from '@ecoop/shared/types'
import { create } from 'zustand'

export interface ICashCheckVoucherStore {
    selectedCashCheckVoucherEntry: ICashCheckVoucherEntryRequest[]
    cashCheckVoucherEntriesDeleted?: TEntityId[]
    setSelectedCashCheckVoucherEntry: (
        entry: ICashCheckVoucherEntryRequest[]
    ) => void
    setCashCheckVoucherEntriesDeleted: (id: TEntityId) => void
    resetCashCheckVoucherDeleted: () => void
}

export const useCashCheckVoucherStore = create<ICashCheckVoucherStore>(
    (set) => ({
        selectedCashCheckVoucherEntry: [],
        cashCheckVoucherEntriesDeleted: [],
        setSelectedCashCheckVoucherEntry: (entry) =>
            set({ selectedCashCheckVoucherEntry: entry }),
        setCashCheckVoucherEntriesDeleted: (id) =>
            set((state) => ({
                cashCheckVoucherEntriesDeleted: [
                    ...(state.cashCheckVoucherEntriesDeleted ?? []),
                    id,
                ],
            })),
        resetCashCheckVoucherDeleted: () =>
            set({ cashCheckVoucherEntriesDeleted: [] }),
    })
)
