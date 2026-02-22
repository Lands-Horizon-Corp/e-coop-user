import z from 'zod'

import { IBaseEntityMeta, IPaginatedResult } from '@/types'

import { CalculatorSchema } from './calculator.validation'

export type ICalculator = IBaseEntityMeta

export type ICalculatorRequest = z.infer<typeof CalculatorSchema>

export type ICalculatorPaginated = IPaginatedResult<ICalculator>
