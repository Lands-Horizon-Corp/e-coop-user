import type { IAccount } from '@ecoop/modules/account'
import type { IJournalVoucher } from '@ecoop/modules/journal-voucher'
import type { ILoanTransaction } from '@ecoop/modules/loan-transaction'
import type { IMemberProfile } from '@ecoop/modules/member-profile'
import type { IUser } from '@ecoop/modules/user'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { TJournalVoucherEntrySchema } from './journal-voucher-entry.validation'

export interface IJournalVoucherEntry extends IBaseEntityMeta {
    loan_transaction_id?: TEntityId
    loan_transaction: ILoanTransaction

    account_id: TEntityId
    account: IAccount

    member_profile_id?: TEntityId
    member_profile?: IMemberProfile

    employee_user_id?: TEntityId
    employee_user?: IUser

    journal_voucher_id: TEntityId
    journal_voucher?: IJournalVoucher

    description?: string
    debit: number
    credit: number
}

export type IJournalVoucherEntryRequest = TJournalVoucherEntrySchema

export type IJournalVoucherEntryPaginated =
    IPaginatedResult<IJournalVoucherEntry>
