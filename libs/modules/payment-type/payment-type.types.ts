import type { IAccount } from '@ecoop/modules/account'
import type {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

import type { TPaymentTypeSchema } from './payment-type.validation'

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
