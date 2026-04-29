import { ICurrency } from '@e-coop-monorepo/modules/currency'
import { IMedia } from '@e-coop-monorepo/modules/media'
import { IOrganizationCategory } from '@e-coop-monorepo/modules/organization-category'
import { IOrganizationMedia } from '@e-coop-monorepo/modules/organization-media'
import { ISubscriptionPlan } from '@e-coop-monorepo/modules/subscription-plan'
import { IUserOrganization } from '@e-coop-monorepo/modules/user-organization'
import {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import {
    TOrganizationEditSchema,
    TOrganizationSchema,
} from './organization.validation'

// Organization Request
export type IOrganizationRequest = TOrganizationSchema

export type IOrganizationEditRequest = TOrganizationEditSchema

// {
//     id?: TEntityId

//     name: string
//     address?: string
//     email?: string
//     contact_number?: string

//     description?: string
//     color?: string

//     media_id?: TEntityId

//     cover_media_id?: TEntityId

//     subscription_plan_id?: TEntityId

//     terms_and_conditions?: string
//     privacy_policy?: string
//     cookie_policy?: string
//     refund_policy?: string
//     user_agreement?: string
//     is_private?: boolean
//     currency_id?: TEntityId
// }

export type IOrganizationPaginated = IPaginatedResult<IOrganization>

export interface ICreateOrganizationResponse {
    organization: IOrganization
    user_organization: IUserOrganization
}

export type IOrganizationWithPolicies = IOrganization & {
    privacy_policy: string
    refund_policy: string
    terms_and_conditions: string
    user_agreement: string
    cookie_policy: string
}
