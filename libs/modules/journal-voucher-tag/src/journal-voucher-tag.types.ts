import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

export interface IJournalVoucherTag extends IBaseEntityMeta {
    journal_voucher_id?: TEntityId
    name: string
    description: string
    category: string
    color: string
    icon: string
}

export type IJournalVoucherTagRequest = {
    journal_voucher_id?: TEntityId
    name?: string
    description?: string
    category?: string
    color?: string
    icon?: string
}

export type IJournalVoucherTagPaginated = IPaginatedResult<IJournalVoucherTag>
