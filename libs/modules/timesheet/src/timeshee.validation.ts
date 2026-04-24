import z from 'zod'

import { entityIdSchema } from '@e-coop-monorepo/shared/validation'

export const TimesheetRequestSchema = z.object({
    media_id: entityIdSchema.optional(),
})
