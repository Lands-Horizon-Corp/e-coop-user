import type { IAdjustmentEntry } from '@ecoop/modules/adjustment-entry'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

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
