import { ICurrency } from '@e-coop-monorepo/modules/currency'
import { IMedia } from '@e-coop-monorepo/modules/media'
import { IOrganizationCategory } from '@e-coop-monorepo/modules/organization-category'
import { IOrganizationMedia } from '@e-coop-monorepo/modules/organization-media'
import { ISubscriptionPlan } from '@e-coop-monorepo/modules/subscription-plan'
import {
    IAuditable,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

// import { IUserOrganization } from '../user-organization'
import {
    // TOrganizationEditSchema,
    TOrganizationSchema,
} from './organization.validation'

export interface IOrganization extends ITimeStamps, IAuditable {
    id: TEntityId

    name: string
    address?: string
    email?: string
    contact_number?: string

    description: string
    color?: string

    media_id?: TEntityId
    media?: IMedia

    cover_media_id?: TEntityId
    cover_media?: IMedia

    organization_key: string

    subscription_plan_id: TEntityId
    subscription_plan: ISubscriptionPlan

    subscription_start_date: string
    subscription_end_date: string

    organization_medias: IOrganizationMedia[]

    organization_categories?: IOrganizationCategory[]

    currency_id: TEntityId
    currency: ICurrency

    is_private?: boolean

    terms_and_conditions?: string
    privacy_policy?: string
    cookie_policy?: string
    refund_policy?: string
    user_agreement?: string

    // SOCIALS
    facebook_link?: string
    x_link?: string
    youtube_link?: string
    personal_website_link?: string
    instagram_link?: string

    theme: string
}

export type IOrganizationRequest = TOrganizationSchema
