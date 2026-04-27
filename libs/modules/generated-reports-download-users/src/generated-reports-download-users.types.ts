import z from 'zod'

import { IGeneratedReport } from '@e-coop-monorepo/modules/generated-report'
import { IMedia } from '@e-coop-monorepo/modules/media'
import { IUser } from '@e-coop-monorepo/modules/user'
import { IUserOrganization } from '@e-coop-monorepo/modules/user-organization'
import {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { GeneratedReportsDownloadUsersSchema } from './generated-reports-download-users.validation'

export interface IGeneratedReportsDownloadUsers extends IBaseEntityMeta {
    user_organization_id: TEntityId
    user_organization: IUserOrganization

    user: IUser
    user_id: TEntityId
    media: IMedia
    media_id: TEntityId

    generated_report_id: TEntityId
    generated_report: IGeneratedReport
}

export type IGeneratedReportsDownloadUsersRequest = z.infer<
    typeof GeneratedReportsDownloadUsersSchema
>

export type IGeneratedReportsDownloadUsersPaginated =
    IPaginatedResult<IGeneratedReportsDownloadUsers>
