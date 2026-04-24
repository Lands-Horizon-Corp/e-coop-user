import z from 'zod'

import {
    civilStatusSchema,
    dateToISOTransformer,
    descriptionTransformerSanitizer,
    emailSchema,
    entityIdSchema,
    generalStatusSchema,
    passwordSchema,
    stringDateSchema,
    stringDateWithTransformSchema,
} from '@e-coop-monorepo/shared/validation'
import { isBefore, startOfDay } from 'date-fns'

import { FAMILY_RELATIONSHIP } from './components/comboboxes/relationship-combobox'
import { EDUCATIONAL_ATTAINMENT } from './member-constant'

export const QuickCreateMemberProfileSchema = z.object({
    // USER AUTH
    key: emailSchema,
    password: passwordSchema,

    // FOR QUICK MEMBER PROFILE
    old_reference_id: z.string().optional(),
    passbook: z.string().optional(),

    organization_id: entityIdSchema.optional(),
    branch_id: entityIdSchema.optional(),

    first_name: z.coerce.string<string>().min(1, 'First name is required'),
    middle_name: z.coerce.string<string>().optional(),
    last_name: z.coerce.string<string>().min(1, 'Last name is required'),
    full_name: z.coerce.string<string>().optional(),
    suffix: z.string().max(15, 'Maximum of 15 characters only').optional(),
    birth_place: z.coerce.string<string>(),

    contact_number: z.string().optional(),

    birthdate: stringDateSchema
        .refine(
            (val) => {
                const date = startOfDay(new Date(val))
                const now = startOfDay(new Date())
                return isBefore(date, now)
            },
            { message: 'Birthdate must be in the past' }
        )
        .transform(dateToISOTransformer),

    member_gender: z.any(),
    civil_status: civilStatusSchema,
    occupation: z.any(),

    status: generalStatusSchema.default('verified').optional(),

    is_mutual_fund_member: z.boolean().default(false).optional(),
    is_micro_finance_member: z.boolean().default(false).optional(),

    accept_terms: z
        .boolean()
        .default(false)
        .optional()
        .refine(
            (val) => {
                return val === true
            },
            {
                message: 'You must accept the terms and conditions',
            }
        ),
})

export type TQuickCreateMemberProfileSchema = z.infer<
    typeof QuickCreateMemberProfileSchema
>

export const MemberProfileIdentitySchema = z.object({
    first_name: z.string().min(1, 'First name is required'),
    middle_name: z.string().optional(),
    last_name: z.string().min(1, 'Last name is required'),
    full_name: z.string().optional(),
    suffix: z.string().optional(),
    birthdate: stringDateSchema.transform(dateToISOTransformer),
    contact_number: z.string().optional(),

    civil_status: civilStatusSchema,
    birth_place: z.coerce
        .string<string>()
        .min(3, 'Birth Place is required')
        .optional(), // ISO ALPHA-3

    member_gender: z.any(),
    member_occupation: z.any().optional(),

    business_address: z.string().optional(),
    business_contact_number: z.string().optional(),

    notes: z.string().optional(),
    description: z
        .string()
        .transform(descriptionTransformerSanitizer)
        .optional(),

    signature_url: z.string().optional(),
    profile_picture_url: z.string().optional(),
})

export type TMemberProfileIdentitySchema = z.infer<
    typeof MemberProfileIdentitySchema
>

export const MemberEducationalAttainmentSchema = z.object({
    id: z.string().optional(),
    member_profile_id: entityIdSchema,
    school_name: z.string().min(1, 'School name is required').optional(),
    school_year: z.coerce
        .number<number>({ error: 'Invalid Year' })
        .transform((val) => Math.trunc(val))
        .refine(
            (val) => {
                const year = Number(val)
                const currentYear = new Date().getFullYear()
                return year >= 1900 && year <= currentYear + 1
            },
            { message: 'Enter a valid school year' }
        )
        .optional(),
    program_course: z.string().min(1, 'Program/Course is required').optional(),
    educational_attainment: z.enum(EDUCATIONAL_ATTAINMENT, {
        error: 'Educational attainment is required',
    }),
    description: z.coerce
        .string<string>()
        .transform(descriptionTransformerSanitizer)
        .optional(),
})

export type TMemberEducationalAttainmentSchema = z.infer<
    typeof MemberEducationalAttainmentSchema
>

export const MemberAssetSchema = z.object({
    id: z.string().optional(),
    member_profile_id: entityIdSchema.optional(),

    name: z.string().min(1, 'Asset name is required'),

    cost: z.coerce.number<number>(),
    entry_date: stringDateSchema.transform(dateToISOTransformer),

    description: z.coerce
        .string<string>()
        .transform(descriptionTransformerSanitizer)
        .optional(),
    media_url: entityIdSchema.optional(),
})

export type IMemberAssetRequest = z.infer<typeof MemberAssetSchema>

export const MemberExpenseSchema = z.object({
    id: entityIdSchema.optional(),
    member_profile_id: entityIdSchema.optional(),

    name: z.string().min(1, 'Expense name is required'),
    amount: z.coerce.number<number>(),
    description: z.coerce
        .string<string>()
        .transform(descriptionTransformerSanitizer)
        .optional(),
})

export type TMemberExpenseSchema = z.infer<typeof MemberExpenseSchema>

export const MemberIncomeSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Name is required'),
    source: z.string().min(1, 'Income source is required'),
    amount: z.coerce.number<number>().min(1, 'Amount must be at least 1'),
    release_date: stringDateSchema.transform(dateToISOTransformer),
    media_id: entityIdSchema.optional(),
    media: z.any(),
})

export type TMemberIncomeSchema = z.infer<typeof MemberIncomeSchema>

export const MemberContactReferenceSchema = z.object({
    id: z.string().optional(),
    member_profile_id: entityIdSchema.optional(),

    name: z.string().min(1, 'Name is required'),
    description: z.coerce
        .string<string>()
        .transform(descriptionTransformerSanitizer)
        .optional(),
    contact_number: z.string().min(1, 'Contact number is required'),
})

export type TMemberContactReferenceSchema = z.infer<
    typeof MemberContactReferenceSchema
>

export const FamilyRelationshipSchema = z.enum(FAMILY_RELATIONSHIP) // Member profile

export const MemberJointAccountSchema = z.object({
    id: z.string().optional(),

    picture_media_id: entityIdSchema,
    picture_media: z.any(),
    signature_media_id: entityIdSchema,
    signature_media: z.any(),

    branch_id: entityIdSchema.optional(),
    organization_id: entityIdSchema.optional(),
    description: z
        .string()
        .optional()
        .transform(descriptionTransformerSanitizer),
    first_name: z.string().min(1, 'First name is required'),
    middle_name: z.string().optional(),
    last_name: z.string().min(1, 'Last name is required'),
    suffix: z.string().optional(),
    birthday: stringDateWithTransformSchema,
    family_relationship: FamilyRelationshipSchema,
})

export type TMemberJointAccountSchema = z.infer<
    typeof MemberContactReferenceSchema
>
