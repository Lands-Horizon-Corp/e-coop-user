import type { IJournalVoucherEntryRequest } from '@e-coop-monorepo/modules/journal-voucher-entry'
import type { TEntityId } from '@e-coop-monorepo/shared/types'
import { create } from 'zustand'

export interface IJournalVoucherStore {
    selectedJournalVoucherEntry: IJournalVoucherEntryRequest[]
    journalVoucherEntriesDeleted?: TEntityId[]
    setSelectedJournalVoucherEntry: (
        entry: IJournalVoucherEntryRequest[]
    ) => void
    setJournalVoucherEntriesDeleted: (id: TEntityId) => void
    resetJournalVoucherDeleted: () => void
}

export const useJournalVoucherStore = create<IJournalVoucherStore>((set) => ({
    selectedJournalVoucherEntry: [],
    setSelectedJournalVoucherEntry: (entry) =>
        set({ selectedJournalVoucherEntry: entry }),
    setJournalVoucherEntriesDeleted: (id) =>
        set((state) => ({
            journalVoucherEntriesDeleted: [
                ...(state.journalVoucherEntriesDeleted ?? []),
                id,
            ],
        })),
    resetJournalVoucherDeleted: () => set({ journalVoucherEntriesDeleted: [] }),
}))
