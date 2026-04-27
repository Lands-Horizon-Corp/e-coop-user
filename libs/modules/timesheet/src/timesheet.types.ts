import z from 'zod'

import { IMedia } from '@e-coop-monorepo/modules/media'
import { IUserBase } from '@e-coop-monorepo/modules/user'
import {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { TimesheetRequestSchema } from './timeshee.validation'

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
