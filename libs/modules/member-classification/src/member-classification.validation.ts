import z from 'zod'

import {
    descriptionSchema,
    descriptionTransformerSanitizer,
} from '@ecoop/shared/validation'

export const MemberClassificationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: descriptionSchema.transform(descriptionTransformerSanitizer),
})
