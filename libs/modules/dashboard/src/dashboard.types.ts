import z from 'zod'

import {
    IBaseEntityMeta,
    IPaginatedResult,
} from '@e-coop-monorepo/shared/types'

import { DashboardSchema } from './dashboard.validation'

export type IDashboard = IBaseEntityMeta

export type IDashboardRequest = z.infer<typeof DashboardSchema>

export type IDashboardPaginated = IPaginatedResult<IDashboard>
