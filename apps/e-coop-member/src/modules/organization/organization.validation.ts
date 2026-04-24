import z from 'zod'

import {
    descriptionTransformerSanitizer,
    entityIdSchema,
} from '@e-coop-monorepo/shared/validation'

export const OrganizationSchema = z.object({
    id: entityIdSchema.optional(),
    name: z.string().min(1, 'Organization name is required'),
    description: z
        .string()
        .min(10, 'Min 10 character description')
        .optional()
        .transform(descriptionTransformerSanitizer),
})

export type TOrganizationSchema = z.infer<typeof OrganizationSchema>
