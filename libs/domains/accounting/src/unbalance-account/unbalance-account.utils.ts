import type { IAccount } from '../account/account.types'

export const canAddMemberProfile = (account?: IAccount) => {
    if (!account) return false

    return account?.type !== 'Other' && !account?.cash_and_cash_equivalence
}
