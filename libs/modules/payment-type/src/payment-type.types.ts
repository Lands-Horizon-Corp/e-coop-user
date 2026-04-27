import { IAccount } from '@e-coop-monorepo/modules/account'
import {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { TPaymentTypeSchema } from './payment-type.validation'

export type PaymentTypeEnum = 'cash' | 'check' | 'online'

export interface IPaymentType extends IAuditable, ITimeStamps {
    id: TEntityId

    organization_id: TEntityId
    branch_id: TEntityId

    name: string
    description?: string
    number_of_days?: number

    account_id?: TEntityId
    account?: IAccount

    type: PaymentTypeEnum
}

export type IPaymentTypeRequest = TPaymentTypeSchema

export type IPaymentTypePaginatedResource = IPaginatedResult<IPaymentType>
