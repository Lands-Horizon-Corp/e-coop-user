import { IAuditable, IMedia, ITimeStamps, TEntityId } from '.'

// auth/current/org - for separate fetching instead of relying in current
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
    privacy_policy: string
    refund_policy: string
    user_agreement: string
    cookie_policy: string
    // SOCIALS
    facebook_link?: string
    x_link?: string
    youtube_link?: string
    personal_website_link?: string
    instagram_link?: string
}
