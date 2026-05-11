// import type { ISignUpRequest } from '@ecoop/domains/iam/modules/authentication'
import type { TEntityId } from '@ecoop/shared/types'

// For creation of member user account
export type IMemberProfileUserAccountRequest<
    ISignUpRequest = { password: string },
> = Omit<ISignUpRequest, 'password'> & {
    id?: TEntityId
    password?: string
}
