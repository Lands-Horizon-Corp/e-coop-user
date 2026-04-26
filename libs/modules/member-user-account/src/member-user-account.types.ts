import { TEntityId } from '@e-coop-monorepo/shared/types'

import { ISignUpRequest } from '@e-coop-monorepo/modules/authentication'

// For creation of member user account
export interface IMemberProfileUserAccountRequest extends Omit<
    ISignUpRequest,
    'password'
> {
    id?: TEntityId
    password?: string
}
