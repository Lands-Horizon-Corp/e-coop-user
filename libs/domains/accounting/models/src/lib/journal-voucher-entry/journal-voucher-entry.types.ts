// import type { ILoanTransaction } from '@ecoop/domains/loans/models'
// import type { IMemberProfile } from '@ecoop/domains/member-crm/models'
// import type { IUser } from '@ecoop/domains/iam/models'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { IAccount } from '../account/account.types'
import type { IJournalVoucher } from '../journal-voucher/journal-voucher.types'
import type { TJournalVoucherEntrySchema } from './journal-voucher-entry.validation'

export interface IJournalVoucherEntry<
    ILoanTransaction = unknown,
    IMemberProfile = unknown,
    IUser = unknown,
> extends IBaseEntityMeta {
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
