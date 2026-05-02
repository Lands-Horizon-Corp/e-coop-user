import type z from 'zod'

import type { IBaseEntityMeta, IPaginatedResult } from '@ecoop/shared/types'

import type { DashboardSchema } from './dashboard.validation'

export type IDashboard = IBaseEntityMeta

export type IDashboardRequest = z.infer<typeof DashboardSchema>

export type IDashboardPaginated = IPaginatedResult<IDashboard>
