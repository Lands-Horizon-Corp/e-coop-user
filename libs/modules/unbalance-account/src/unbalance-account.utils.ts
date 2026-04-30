import type { IAccount } from '@e-coop-monorepo/modules/account'

export const canAddMemberProfile = (account?: IAccount) => {
    if (!account) return false

    return account?.type !== 'Other' && !account?.cash_and_cash_equivalence
}
