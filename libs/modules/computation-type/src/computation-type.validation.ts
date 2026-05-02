import { z } from 'zod'

import {
    descriptionSchema,
    descriptionTransformerSanitizer,
} from '@ecoop/shared/validation'

export const AccountsComputationTypeRequestSchema = z.object({
    id: z.string(),
    companyId: z.string(),
    name: z.string().min(1, 'Name is required'),
    description: descriptionSchema
        .min(1, 'Description is required')
        .transform(descriptionTransformerSanitizer),
})

export type IAccountsComputationTypeFormValues = z.infer<
    typeof AccountsComputationTypeRequestSchema
>
