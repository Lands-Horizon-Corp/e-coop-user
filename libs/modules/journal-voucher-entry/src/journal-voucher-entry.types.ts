import { IJournalVoucher } from '@e-coop-monorepo/modules/journal-voucher'
import {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { IAccount } from '@e-coop-monorepo/modules/account'
import { ILoanTransaction } from '@e-coop-monorepo/modules/loan-transaction'
import { IMemberProfile } from '@e-coop-monorepo/modules/member-profile'
import { IUser } from '@e-coop-monorepo/modules/user'
import { TJournalVoucherEntrySchema } from './journal-voucher-entry.validation'

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
