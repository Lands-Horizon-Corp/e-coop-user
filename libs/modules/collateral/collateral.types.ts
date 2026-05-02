import type { IBaseEntityMeta, IPaginatedResult } from '@ecoop/shared/types'

import type { TCollateralSchema } from './collateral.validation'

export interface ICollateral extends IBaseEntityMeta {
    icon: string

    name: string
    description: string
}

export type ICollateralRequest = TCollateralSchema

export type ICollateralPaginated = IPaginatedResult<ICollateral>
