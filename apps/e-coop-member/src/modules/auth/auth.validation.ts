import z from 'zod'

import { PASSWORD_MIN_LENGTH } from '@ecoop/shared/constants'
import { otpCodeSchema, passwordSchema } from '@ecoop/shared/validation'

export const UserLoginRequestSchema = z.object({
    key: z.coerce.string<string>().min(1, 'Email/Contact Number is required'),
    password: z.coerce.string<string>().min(1, 'Password is required'),
})

export type TUserLoginRequestSchema = z.infer<typeof UserLoginRequestSchema>

// OTP Schema
export const OTPSchema = z.object({
    otp: otpCodeSchema,
})

export type TOTPSchema = z.infer<typeof OTPSchema>

// Define the Zod schema for UserSettingsChangePasswordRequest
export const UserSettingsChangePasswordRequestSchema = z.object({
    old_password: z.string().min(8),
    new_password: z.string().min(8),
    confirm_password: z.string().min(8),
})

export const ForgotPasswordSchema = z.object({
    key: z.string().min(1, 'Please provide Email, Number or Email'),
})

export type TForgotPasswordFormSchema = z.infer<typeof ForgotPasswordSchema>

export const ResetPasswordSchema = z
    .object({
        reset_id: z.uuid('Reset ID is missing'),
        new_password: passwordSchema,
        confirm_password: z
            .string({ error: 'Confirm password' })
            .min(PASSWORD_MIN_LENGTH, `Password doesn't match`),
    })
    .refine(
        ({ new_password, confirm_password }) =>
            new_password === confirm_password,
        {
            message: "Password doesn't match",
            path: ['confirm_password'],
        }
    )

export type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>
