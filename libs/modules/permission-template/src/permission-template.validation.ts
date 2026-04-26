import z from 'zod'

import {
    descriptionTransformerSanitizer,
    entityIdSchema,
} from '@e-coop-monorepo/shared/validation'

import { PermissionSchema } from '@e-coop-monorepo/modules/permission'

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
