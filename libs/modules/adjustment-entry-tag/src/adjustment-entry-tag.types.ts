import {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { IAdjustmentEntry } from '@e-coop-monorepo/modules/adjustment-entry'

export interface IAdjustmentEntryTag extends IBaseEntityMeta {
    adjustment_entry_id: TEntityId
    adjustment_entry: IAdjustmentEntry

    name: string
    description?: string
    category: string
    color: string
    icon: string
}

export interface IAdjustmentEntryTagRequest {
    adjustment_entry_id: TEntityId
    name: string
    description?: string
    category: string
    color: string
    icon: string
}

export type IAdjustmentEntryTagPaginated = IPaginatedResult<IAdjustmentEntryTag>
