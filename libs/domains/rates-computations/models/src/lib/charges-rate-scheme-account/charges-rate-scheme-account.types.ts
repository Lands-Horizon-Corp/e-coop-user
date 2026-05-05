import type { IAccount } from '@ecoop/domains/accounting'
import type { IChargesRateScheme } from '../charges-rate-scheme/charges-rate-scheme.types'
import type {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

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
