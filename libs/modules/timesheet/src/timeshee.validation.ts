import z from 'zod'

import { entityIdSchema } from '@ecoop/shared/validation'

export const TimesheetRequestSchema = z.object({
    media_id: entityIdSchema.optional(),
})
