import { create } from 'zustand'

import type {
    ITransactionBatch,
    ITransactionBatchMinimal,
} from '@ecoop/transactions/models'

interface ITransactionBatchStoreContent {
    data: ITransactionBatch | ITransactionBatchMinimal | null
    hasNoTransactionBatch: boolean
}

interface ITransactionBatchStore extends ITransactionBatchStoreContent {
    setData: (data: ITransactionBatch | ITransactionBatchMinimal | null) => void
    reset: (defautlData?: Partial<ITransactionBatchStoreContent>) => void
}

export const useTransactionBatchStore = create<ITransactionBatchStore>(
    (set) => ({
        data: null,
        hasNoTransactionBatch: false,

        setData: (newData) => {
            set((state) => {
                if (newData !== null) {
                    return {
                        data: {
                            ...state.data,
                            ...newData,
                        },
                        hasNoTransactionBatch: true,
                    }
                }
                return { data: null, hasNoTransactionBatch: false }
            })
        },

        reset: (defaultData) => {
            set({ data: null, hasNoTransactionBatch: false, ...defaultData })
        },
    })
)
