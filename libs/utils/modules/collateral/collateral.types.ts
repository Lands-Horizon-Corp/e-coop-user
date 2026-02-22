import { IBaseEntityMeta, IPaginatedResult } from '@/types'

import { TCollateralSchema } from './collateral.validation'

export interface ICollateral extends IBaseEntityMeta {
    icon: string

    name: string
    description: string
}

export type ICollateralRequest = TCollateralSchema

export type ICollateralPaginated = IPaginatedResult<ICollateral>
