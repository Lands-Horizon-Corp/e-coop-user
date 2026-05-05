import type z from 'zod'

import type { ICurrency } from '@ecoop/platforms/currency'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { HolidaySchema } from './holiday.validation'

export interface IHoliday extends IBaseEntityMeta {
    name: string
    entry_date: string

    currency_id: TEntityId
    currency: ICurrency

    description?: string
}

export type IHolidayRequest = z.infer<typeof HolidaySchema>

export type IHolidayPaginated = IPaginatedResult<IHoliday>

export interface IHolidayYears {
    year: number
    count: number
}

// FOR HOOK MODE
export type THolidayHookMode = 'all' | 'currency' | 'year' | 'year-currency'
