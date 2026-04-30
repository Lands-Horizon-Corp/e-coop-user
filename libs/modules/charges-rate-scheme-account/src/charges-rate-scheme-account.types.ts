import type { IAccount } from '@e-coop-monorepo/modules/account'
import type { IChargesRateScheme } from '@e-coop-monorepo/modules/charges-rate-scheme'
import type {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

export interface IChargesRateSchemeAccountRequest {
    charges_rate_scheme_id: TEntityId
    account_id: TEntityId
}

export interface IChargesRateSchemeAccount
    extends ITimeStamps, IAuditable, IOrgBranchIdentity {
    id: TEntityId
    charges_rate_scheme_id: TEntityId
    charges_rate_scheme?: IChargesRateScheme
    account_id: TEntityId
    account?: IAccount
}
