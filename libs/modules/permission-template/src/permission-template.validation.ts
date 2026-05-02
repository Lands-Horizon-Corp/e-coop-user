import z from 'zod'

import { PermissionSchema } from '@ecoop/modules/permission'
import {
    descriptionTransformerSanitizer,
    entityIdSchema,
} from '@ecoop/shared/validation'

export const PermissionTemplateSchema = z.object({
    id: entityIdSchema.optional(),
    branch_id: entityIdSchema.optional(),
    organization_id: entityIdSchema.optional(),

    name: z.coerce.string().min(1, 'Role template name is required'),
    description: z
        .string()
        .min(1, 'A simple/short description is required')
        .optional()
        .transform(descriptionTransformerSanitizer),
    permissions: z
        .array(PermissionSchema)
        .min(1, 'Must have atleast 1 permission'),
})

export type TPermissionTemplateSchema = z.infer<typeof PermissionTemplateSchema>
