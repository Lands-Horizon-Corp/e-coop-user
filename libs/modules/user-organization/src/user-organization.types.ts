import { USER_ORG_APPLICATION_STATUS } from '@e-coop-monorepo/shared/constants'
import {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { IAccount } from '@e-coop-monorepo/modules/account'
import { IBranch } from '@e-coop-monorepo/modules/branch'
import { IOrganization } from '@e-coop-monorepo/modules/organization'
import { IPaymentType } from '@e-coop-monorepo/modules/payment-type'
import { TPermission } from '@e-coop-monorepo/modules/permission'
import { IUserBase, TUserType } from '@e-coop-monorepo/modules/user'
import {
    TTimeMachineSchema,
    TUserOrganizationSettingsSchema,
} from './user-organization.validation'

export interface IUserOrganizationContext<
    TUserOrganization = IUserOrganization | undefined,
> {
    user_organization?: TUserOrganization | null
}

export type TUserOrganizationApplicationStatus =
    (typeof USER_ORG_APPLICATION_STATUS)[number]

export interface IUserOrganization<TUser = IUserBase>
    extends
        IBaseEntityMeta,
        Omit<IUserOrganizationSettings, 'user_type' | 'description'> {
    id: TEntityId

    // organization_id: TEntityId
    // organization: IOrganization

    // branch_id: TEntityId
    // branch: IBranch

    description?: string
    application_description?: string
    user_setting_description: string

    user_id: TEntityId
    user: TUser

    user_type: TUserType

    application_status: TUserOrganizationApplicationStatus

    developer_secret_key: string
    is_seeded: boolean

    /** Permissions */
    permission_name: string
    permission_description: string
    permissions: TPermission[]

    /** Payment OR Settings */
    payment_or_unique: boolean
    payment_or_allow_user_input: boolean
    payment_or_current: number
    payment_or_end: number
    payment_or_iteration: number
    payment_or_use_date_or: boolean
    payment_allow_prefix: boolean
    payment_padding: number

    /** Financial Rules */
    allow_withdraw_negative_balance: boolean
    allow_withdraw_exact_balance: boolean
    maintaining_balance: boolean

    /** Status */
    status: TUserOrganizationApplicationStatus
    last_online_at: string
    time_machine_time?: string

    /** Accounting Defaults */
    settings_accounting_payment_default_value_id?: TEntityId
    settings_accounting_payment_default_value?: IAccount

    settings_accounting_deposit_default_value_id?: TEntityId
    settings_accounting_deposit_default_value?: IAccount

    settings_accounting_withdraw_default_value_id?: TEntityId
    settings_accounting_withdraw_default_value?: IAccount

    settings_payment_type_default_value_id?: TEntityId
    settings_payment_type_default_value?: IPaymentType

    // AUTO INCREMENTS
    // check_voucher_general_auto_increment: boolean
    loan_voucher_auto_increment: boolean
    adjustment_entry_auto_increment: boolean
    journal_voucher_auto_increment: boolean
    cash_check_voucher_auto_increment: boolean
    deposit_auto_increment: boolean
    withdraw_auto_increment: boolean
    payment_auto_increment: boolean
}

export interface IUserOrganizationResponse {
    organization: IOrganization
    user_organization: IUserOrganization
}

export interface UserOrganizationGroup {
    orgnizationId: TEntityId
    userOrganizationId: TEntityId
    organizationDetails: IOrganization
    branches: IBranch[]
    userOrganization: IUserOrganization
    isPending: 'pending' | 'reported' | 'accepted' | 'ban'
}

export interface IOrgUserOrganizationGroup extends IOrganization {
    user_organizations: IUserOrganization[]
}

export interface IUserOrganizationPermissionRequest {
    permission_name: string
    permission_description: string
    permissions: TPermission[]
}

export type IUserOrganizationSettings = TUserOrganizationSettingsSchema

export type IUserOrganizationTimeMachine = TTimeMachineSchema

export type IUserOrganizationPaginated<TUser = IUserBase> = IPaginatedResult<
    IUserOrganization<TUser>
>
