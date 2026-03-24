import { IMemberProfile } from '../member-profile'
import { IUserBase } from '../user'
import { IUserOrganization } from '../user-organization'
import {
    TForgotPasswordFormSchema,
    TResetPasswordSchema,
    TUserLoginRequestSchema,
} from './auth.validation'

export type IUserLoginRequest = TUserLoginRequestSchema

export type IUserForgotPasswordRequest = TForgotPasswordFormSchema

export type IUserPasswordResetRequest = TResetPasswordSchema

export interface IAuthContext<TUser = IUserBase | undefined> {
    user?: TUser
    member_profile?: IMemberProfile | null
    user_organization?: IUserOrganization | null
}

export interface ISignInRequest {
    key: string
    password: string
}
