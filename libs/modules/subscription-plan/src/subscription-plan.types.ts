import { ICurrency } from '@e-coop-monorepo/modules/currency'
import { IPaginatedResult } from '@e-coop-monorepo/shared/types'
import {
    IAuditable,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

export type TPricingPlanMode = 'monthly' | 'yearly'

export interface ISubscriptionPlanRequest {
    id?: TEntityId

    name: string
    description: string

    cost: number
    timespan: number

    max_branches: number
    max_employees: number
    max_members_per_branch: number

    discount: number
    yearly_discount: number
    is_recommended?: boolean

    // Core Features
    has_api_access?: boolean
    has_flexible_org_structures?: boolean
    has_ai_enabled?: boolean
    has_machine_learning?: boolean

    // Limits
    max_api_calls_per_month?: number

    currency_id?: TEntityId | null
}

export type ISubscriptionPlanPaginated = IPaginatedResult<ISubscriptionPlan>

export type TSubscriptionPlanMode = 'all' | 'timezone'
