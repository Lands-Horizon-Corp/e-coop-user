import { buildOR } from '@e-coop-monorepo/modules/or-builder'

import type { TORJournalVoucherSettings } from '../journal-voucher'

export const isAllowedInputJournalVoucherOR = (
    orOptions?: TORJournalVoucherSettings
) => {
    if (!orOptions) return true

    return orOptions.journal_voucher_allow_user_input
}

export const buildJournalVoucherOR = (
    orOptions: Omit<TORJournalVoucherSettings, 'journal_voucher_auto_increment'>
) => {
    const padding = orOptions.journal_voucher_padding
    const currentOr = orOptions.journal_voucher_or_current
    const prefix = orOptions.journal_voucher_prefix

    return buildOR({ currentOr, prefix, padding })
}
