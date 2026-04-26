import { z } from 'zod'

import {
    EntityIdSchema,
    entityIdSchema,
} from '@e-coop-monorepo/shared/validation'

import { PaymentWithTransactionSchema } from '@e-coop-monorepo/modules/transaction'

export const QuickWithdrawSchema = PaymentWithTransactionSchema.extend({
    member_profile_id: EntityIdSchema('Member').min(1),
    member_joint_account_id: entityIdSchema.optional(),
    reference_number: z
        .string({ error: 'Reference number is required' })
        .min(1),
    is_reference_number_checked: z.boolean().default(false).optional(),

    member_joint_account: z.any().optional(),
})

export type TQuickWithdrawSchemaFormValues = z.infer<typeof QuickWithdrawSchema>
