import type z from 'zod'

import type { IGeneratedReport } from '@e-coop-monorepo/modules/generated-report'
import type { IMedia } from '@e-coop-monorepo/modules/media'
import type { IUser } from '@e-coop-monorepo/modules/user'
import type { IUserOrganization } from '@e-coop-monorepo/modules/user-organization'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

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
