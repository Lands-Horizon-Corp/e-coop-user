import z from 'zod'

import type { IInterestRateByTermsHeaderResponse } from '@ecoop/modules/interest-rate-by-terms-header'
import type { IInterestRateScheme } from '@ecoop/modules/interest-rate-scheme'
import type { IMemberClassification } from '@ecoop/modules/member-classification'
import type {
    IAuditable,
    IOrgBranchIdentity,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'
import { entityIdSchema } from '@ecoop/shared/validation'

export interface IMemberClassificationInterestRateRequest {
    name: string
    description?: string
    interest_rate_scheme_id?: TEntityId
    member_classification_id?: TEntityId
    interest_rate_by_terms_header_id?: TEntityId
}

export interface IMemberClassificationInterestRate
    extends ITimeStamps, IAuditable, IOrgBranchIdentity {
    id: TEntityId
    name: string
    description: string
    interest_rate_scheme_id?: TEntityId
    interest_rate_scheme?: IInterestRateScheme
    member_classification_id?: TEntityId
    member_classification?: IMemberClassification
    interest_rate_by_terms_header_id?: TEntityId
    interest_rate_by_terms_header?: IInterestRateByTermsHeaderResponse
}

export const memberClassificationInterestRateRequestSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().optional(),
    interest_rate_scheme_id: entityIdSchema.optional(),
    member_classification_id: entityIdSchema.optional(),
    interest_rate_by_terms_header_id: entityIdSchema.optional(),
})
