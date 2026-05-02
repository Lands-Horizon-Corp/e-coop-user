import type { IAccount } from '@ecoop/modules/account'

export const canAddMemberProfile = (account?: IAccount) => {
    if (!account) return false

    return account?.type !== 'Other' && !account?.cash_and_cash_equivalence
}
