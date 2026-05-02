import type z from 'zod'

import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { TransactionsSchema } from './transactions.validation'

export interface ITransactions extends IBaseEntityMeta {
    id: TEntityId
    //add here
}

export type ITransactionsRequest = z.infer<typeof TransactionsSchema>

export type ITransactionsPaginated = IPaginatedResult<ITransactions>
