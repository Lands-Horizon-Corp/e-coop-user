import {
    TForgotPasswordFormSchema,
    TResetPasswordSchema,
    TUserLoginRequestSchema,
} from './auth.validation'

export type IUserLoginRequest = TUserLoginRequestSchema

export type IUserForgotPasswordRequest = TForgotPasswordFormSchema

export type IUserPasswordResetRequest = TResetPasswordSchema
