import type z from 'zod'

import type { IBaseEntityMeta, IPaginatedResult } from '@ecoop/shared/types'

import type { CalculatorSchema } from './calculator.validation'

export type ICalculator = IBaseEntityMeta

export type ICalculatorRequest = z.infer<typeof CalculatorSchema>

export type ICalculatorPaginated = IPaginatedResult<ICalculator>
