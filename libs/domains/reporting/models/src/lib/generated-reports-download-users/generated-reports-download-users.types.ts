import type z from 'zod'

import type { IUser } from '@ecoop/domains/iam/models'
import type { IUserOrganization } from '@ecoop/domains/iam/models'
import type { IMedia } from '@ecoop/platforms/media/models'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

import type { IGeneratedReport } from '../generated-report/generated-report.types'
import type { GeneratedReportsDownloadUsersSchema } from './generated-reports-download-users.validation'

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
