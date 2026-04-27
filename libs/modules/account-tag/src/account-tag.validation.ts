import z from 'zod'

import { TTagCategory } from '@e-coop-monorepo/modules/tag-template'
import {
    descriptionSchema,
    descriptionTransformerSanitizer,
} from '@e-coop-monorepo/shared/validation'

export const AccountTagSchema = z.object({
    account_id: z.string().min(1, 'Account is required'),
    account: z.any().optional(),
    name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
    description: descriptionSchema
        .optional()
        .transform(descriptionTransformerSanitizer),
    category: z
        .string()
        .min(1, 'Category is required') as z.ZodType<TTagCategory>,
    color: z.string().optional(),
    icon: z.string().optional(),
})

export type AccountTagFormValues = z.infer<typeof AccountTagSchema>
