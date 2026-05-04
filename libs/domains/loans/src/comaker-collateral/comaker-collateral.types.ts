import type z from 'zod'

import type { ICollateral } from '../collateral/collateral.types'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { ComakerCollateralSchema } from './comaker-collateral.validation'

export interface IComakerCollateral extends IBaseEntityMeta {
    loan_transaction_id: TEntityId
    description: string | undefined
    collateral_id: TEntityId
    collateral: ICollateral
    amount: number
    months_count: number
    year_count: number
}

export type IComakerCollateralRequest = z.infer<typeof ComakerCollateralSchema>

export type IComakerCollateralPaginated = IPaginatedResult<IComakerCollateral>
