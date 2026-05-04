import type { ICurrency } from '@ecoop/modules/currency'
import type { IMedia } from '@ecoop/modules/media'
import type { IOrganizationCategory } from '@ecoop/domains/iam'
import type { IOrganizationMedia } from '@ecoop/domains/iam'
import type { ISubscriptionPlan } from '@ecoop/domains/iam'
import type { IAuditable, ITimeStamps, TEntityId } from '@ecoop/shared/types'

// import { IUserOrganization } from '../user-organization'
import type {
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
