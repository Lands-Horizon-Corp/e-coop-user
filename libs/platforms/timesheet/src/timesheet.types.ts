import type z from 'zod'

import type { IMedia } from '@ecoop/platforms/media'
import type { IUserBase } from '@ecoop/domains/iam/models'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { TimesheetRequestSchema } from './timeshee.validation'

export interface ITimesheet extends IBaseEntityMeta {
    user_id: TEntityId
    user?: IUserBase

    media_in_id?: TEntityId
    media_in?: IMedia

    media_out_id?: TEntityId
    media_out?: IMedia

    time_in: string
    time_out?: string
}

export type ITimesheetInOutRequest = z.infer<typeof TimesheetRequestSchema>

export type IPaginatedTimesheet = IPaginatedResult<ITimesheet>
