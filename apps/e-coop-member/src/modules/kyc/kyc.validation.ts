import z from 'zod'

import {
    EntityIdSchema,
    civilStatusSchema,
    stringDateSchema,
} from '@e-coop-monorepo/shared/validation'
import { isBefore, startOfDay } from 'date-fns'

import { MemberAddressSchema } from '@e-coop-monorepo/modules/member-address'
import { MemberGovernmentBenefitSchema } from '@e-coop-monorepo/modules/member-government-benefit'

//\\//\\//\\//  BASE SCHEMAS //\\//\\//\\//

export const KYCVerifyBranchSchema = z.object({
    branch_id: EntityIdSchema('Select a branch'),
    branch: z.any(),
})

export const KYCVerifyPersonalInfoSchema = z.object({
    username: z.coerce
        .string<string>()
        .min(1, 'User name is required')
        .max(30)
        .lowercase('Username must be lowercase'),
    first_name: z.coerce.string<string>().min(1, 'First name is required'),
    last_name: z.coerce.string<string>().min(1, 'Last name is required'),
    middle_name: z.coerce.string<string>().optional(),
    suffix: z.coerce.string<string>().optional().nullable(),
    civil_status: civilStatusSchema,
    member_gender: z.any(),
    birthdate: stringDateSchema
        .refine(
            (val) => {
                const date = startOfDay(new Date(val))
                const now = startOfDay(new Date())
                return isBefore(date, now)
            },
            { message: 'Birthdate must be in the past' }
        )
        .transform((val) => new Date(val).toISOString()),
    member_gender_id: EntityIdSchema('Member Gender is required'),
    // gender: z.enum(['male', 'female', 'other'], 'Please select a valid gender'),
})

export const KYCVerifySecurityDetailsSchema = z.object({
    email: z.email('Invalid email').min(1, 'Email is required'),
    full_name: z.string('Invalid fullname').min(1, 'Fullname is required'),
    contact_number: z.coerce
        .string<string>()
        .min(1, 'Phone number is required')
        .regex(/^\+\d{10,15}$/, 'Phone must be in E.164 format'),
    password: z.coerce
        .string<string>()
        .min(8, 'Password should be atleast 8 characters')
        .max(50, 'Password should not exceed 50 characters'),
    password_confirmation: z.coerce.string<string>().min(1, 'Confirm Password'),
})

export const KYCVerifyEmailSchema = z.object({
    email: z.email('Invalid email').min(1, 'Email is required'),
    verified_email: z.string().optional(),
    otp: z.coerce
        .number<string>('OTP must be a number')
        .min(6, 'OTP must be 6'),
})

export const KYCVerifyPhoneSchema = z.object({
    contact_number: z.coerce
        .string<string>()
        .min(1, 'Phone number is required'),
    verified_contact_number: z.string().optional(),
    otp: z.coerce
        .number<string>('OTP must be a number')
        .min(6, 'OTP must be 6'),
})

export const KYCVerifyAddressesSchema = z.object({
    addresses: z.array(MemberAddressSchema).min(1, 'At least 1 address'),
})

export const KYCVerifyGovernmentBenefitSchema = z.object({
    government_benefits: z.array(MemberGovernmentBenefitSchema),
})

export const KYCVerifySelfieSchema = z.object({
    selfie_media_id: EntityIdSchema('Selfie is required'),
    selfie_media: z.any(),
})

export const KYCAgreeTermsSchema = z.object({
    agree_terms: z.literal(true, 'Must accept terms'),
    register_data: z.any(),
})

//\\//\\//\\// KYC STEPPED (PANG DESCRIMINATED SHIT) //\\//\\//\\//

// Branch Picking

//\\//\\//\\// DISCRIMINATED UNION SIHT //\\//\\//\\//

export const KYCDiscriminatedRegisterSchema = z.discriminatedUnion('step', [
    z
        .object({
            step: z.literal(1),
        })
        .extend(KYCVerifyBranchSchema.shape),
    z
        .object({
            step: z.literal(2),
        })
        .extend(KYCVerifyPersonalInfoSchema.shape),
    z
        .object({
            step: z.literal(3),
        })
        .extend(KYCVerifySecurityDetailsSchema.shape)
        .superRefine((data, ctx) => {
            if (data.password !== data.password_confirmation) {
                ctx.addIssue({
                    path: ['confirm_password'],
                    message: 'Password do not match',
                    code: z.ZodIssueCode.custom,
                })
            }
        }),
    z
        .object({
            step: z.literal(4),
        })
        .extend(KYCVerifyEmailSchema.shape),
    z
        .object({
            step: z.literal(5),
        })
        .extend(KYCVerifyPhoneSchema.shape),
    z
        .object({
            step: z.literal(6),
        })
        .extend(KYCVerifyAddressesSchema.shape),

    z.object({
        step: z.literal(7),
        government_benefits: z.array(MemberGovernmentBenefitSchema),
    }),
    z
        .object({
            step: z.literal(8),
        })
        .extend(KYCVerifySelfieSchema.shape),

    z
        .object({
            step: z.literal(9),
            ata: z.any(),
        })
        .extend(KYCAgreeTermsSchema.shape),
])

export const KYCRegisterSchema = z
    .object({
        step: z.number(),
        register_data: z.any(),
        agree_terms: z.literal(true, 'Must accept terms'),
    })
    .extend(KYCVerifyBranchSchema.shape)
    .extend(KYCVerifyPersonalInfoSchema.shape)
    .extend(KYCVerifySecurityDetailsSchema.shape)
    .extend(KYCVerifyPhoneSchema.omit({ otp: true }).shape)
    .extend(KYCVerifyAddressesSchema.shape)
    .extend(KYCVerifyGovernmentBenefitSchema.shape)
    .extend(KYCVerifySelfieSchema.shape)
    .extend(KYCAgreeTermsSchema.shape)
    .superRefine((data, ctx) => {
        if (data.password !== data.password_confirmation) {
            ctx.addIssue({
                path: ['confirm_password'],
                message: 'Password do not match',
                code: 'custom',
            })
        }
    })

// export const KYCRegisterSchema = z.

//\\//\\//\\//  EXPORT NG TYPES //\\//\\//\\//

export type TKYCRegisterSchema = z.infer<typeof KYCRegisterSchema>
export type TKYCBranchSchema = z.infer<typeof KYCVerifyBranchSchema>
export type TKYCAgreeTermsSchema = z.infer<typeof KYCAgreeTermsSchema>
export type TKYCSelfieSchema = z.infer<typeof KYCVerifySelfieSchema>
export type TKYCVerifyPersonalInfoSchema = z.infer<
    typeof KYCVerifyPersonalInfoSchema
>
export type TKYCVerifySecurityDetailsSchema = z.infer<
    typeof KYCVerifySecurityDetailsSchema
>
export type TKYCVerifyEmailSchema = z.infer<typeof KYCVerifyEmailSchema>
export type TKYCVerifyPhoneSchema = z.infer<typeof KYCVerifyPhoneSchema>
export type TKYCVerifyAddressesSchema = z.infer<typeof KYCVerifyAddressesSchema>
export type TKYCVerifyGovernmentBenefitsSchema = z.infer<
    typeof KYCVerifyGovernmentBenefitSchema
>
