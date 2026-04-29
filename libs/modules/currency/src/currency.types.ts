import z from 'zod'

import { ICurrency, IPaginatedResult } from '@e-coop-monorepo/shared/types'

import { CurrencySchema } from './currency.validation'

export type ICurrencyRequest = z.infer<typeof CurrencySchema>

export type ICurrencyPaginated = IPaginatedResult<ICurrency>

export type TCurrencyHookMode = 'all' | 'available' | 'blotter-available'
