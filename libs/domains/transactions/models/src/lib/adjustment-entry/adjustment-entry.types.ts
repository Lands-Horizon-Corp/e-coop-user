import type { IAccount } from '@ecoop/domains/accounting'
import type { IAdjustmentEntryTag } from '../adjustment-entry-tag/adjustment-entry-tag.types'
import type { IAdjustmentVoucherSettings } from '@ecoop/domains/iam'
import type { IMemberProfile } from '@ecoop/domains/member-crm'
import type { IPaymentType } from '../payment-type/payment-type.types'
import type { IUser } from '@ecoop/domains/iam'
import type { IUserOrganizationSettings } from '@ecoop/domains/iam'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

export interface IAdjustmentEntry extends IBaseEntityMeta {
    //add here
    signature_media_id?: TEntityId
    signature_media: TEntityId

    account_id: TEntityId
    account: IAccount

    member_profile_id?: TEntityId
    member_profile?: IMemberProfile

    employee_user_id?: TEntityId
    employee_user?: IUser

    payment_type_id?: TEntityId
    payment_type?: IPaymentType

    type_of_payment_type?: string

    description?: string
    reference_number?: string
    entry_date: string

    debit: number
    credit: number

    adjustment_entry_tags: IAdjustmentEntryTag[]
}

export interface IAdjustmentEntryRequest {
    signature_media_id?: TEntityId
    account_id: TEntityId

    member_profile_id?: TEntityId
    payment_type_id?: TEntityId

    type_of_payment_type?: string

    description?: string
    reference_number?: string
    entry_date: string

    debit: number
    credit: number
}

export interface IAdjustmentEntryTotal {
    balance: number
    total_debit: number
    total_credit: number
    is_balanced: boolean
}

export type IAdjustmentEntryPaginated = IPaginatedResult<IAdjustmentEntry>

export type TAdjustmentEntryHookMode = 'all' | 'currency' | 'currency-employee'

export type TORAdjustmentVoucherSettings = Omit<
    IAdjustmentVoucherSettings,
    'adjustment_voucher_or_unique'
> &
    Pick<IUserOrganizationSettings, 'adjustment_entry_auto_increment'>
