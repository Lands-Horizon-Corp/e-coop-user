import type z from 'zod'

import type { ITimeDepositType } from '@e-coop-monorepo/modules/time-deposit-type'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import type { TimeDepositComputationPreMatureSchema } from './time-deposit-computation-pre-mature.validation'

export interface ITimeDepositComputationPreMature extends IBaseEntityMeta {
    time_deposit_type_id: TEntityId
    time_deposit_type: ITimeDepositType
    terms: number
    from: number
    to: number
    rate: number
}

export type ITimeDepositComputationPreMatureRequest = z.infer<
    typeof TimeDepositComputationPreMatureSchema
>

export type ITimeDepositComputationPreMaturePaginated =
    IPaginatedResult<ITimeDepositComputationPreMature>
