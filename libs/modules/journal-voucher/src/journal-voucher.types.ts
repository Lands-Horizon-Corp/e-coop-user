import type { IJournalVoucherORSettings } from '@e-coop-monorepo/modules/branch-settings'
import type { ICurrency } from '@e-coop-monorepo/modules/currency'
import type {
    IJournalVoucherEntry,
    IJournalVoucherEntryRequest,
} from '@e-coop-monorepo/modules/journal-voucher-entry'
import type { IJournalVoucherTag } from '@e-coop-monorepo/modules/journal-voucher-tag'
import type { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import type { IUser } from '@e-coop-monorepo/modules/user'
import type { IUserOrganizationSettings } from '@e-coop-monorepo/modules/user-organization'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

export interface IJournalVoucher extends IBaseEntityMeta {
    cash_voucher_number: string
    date: string
    description?: string
    reference: string
    name: string

    currency_id: TEntityId
    currency: ICurrency

    printed_by_user_id?: string
    printed_by?: IUser

    approved_by_user_id?: string
    approved_by?: IUser

    released_by_user_id?: string
    released_by?: IUser

    posted_at?: string
    posted_by_id?: TEntityId
    posted_by?: IUser

    printed_date?: string
    print_number?: number

    approved_date?: string
    released_date?: string
    member_profile?: IMemberProfile

    journal_voucher_tags?: IJournalVoucherTag[]
    journal_voucher_entries?: IJournalVoucherEntry[]

    total_debit: number
    total_credit: number

    employee_user: IUser
}

export interface IJournalVoucherRequest {
    cash_voucher_number?: string
    date: string
    description?: string
    reference?: string
    status?: string

    currency_id: TEntityId
    currency: ICurrency

    journal_voucher_entries?: IJournalVoucherEntryRequest[]
    journal_voucher_entries_deleted?: TEntityId[]
}

export interface IJournalVoucherPrintRequest {
    cash_voucher_number: string
}

export enum EJournalVoucherStatus {
    Draft = 'draft',
    Posted = 'posted',
    Cancelled = 'cancelled',
}

export type TJournalVoucherMode =
    | 'draft'
    | 'printed'
    | 'approved'
    | 'released'
    | 'release-today'

export type TPrintMode = 'print' | 'print-undo' | 'approve'

export type TJournalActionMode = 'approve-undo' | 'release' | 'print-only'

export type IJournalVoucherPaginated = IPaginatedResult<IJournalVoucher>

export type TORJournalVoucherSettings = Omit<
    IJournalVoucherORSettings,
    'journal_voucher_or_unique'
> &
    Pick<IUserOrganizationSettings, 'journal_voucher_auto_increment'>
