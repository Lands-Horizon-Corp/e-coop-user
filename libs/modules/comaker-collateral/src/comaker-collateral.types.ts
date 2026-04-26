import z from 'zod'

import {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { ICollateral } from '@e-coop-monorepo/modules/collateral'
import { ComakerCollateralSchema } from './comaker-collateral.validation'

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
