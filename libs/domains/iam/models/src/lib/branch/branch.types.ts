import type { IBranchSettings } from '../branch-settings/branch-settings.types'
import type { ICurrency } from '@ecoop/modules/currency'
import type { IMedia } from '@ecoop/modules/media'
import type { IOrganization } from '../organization/organization.types'
import type {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@ecoop/shared/types'

import type { branchTypeEnum } from './branch.enums'
import type { TBranchSchema } from './branch.validation'

// Resource
export interface IBranch extends ITimeStamps, IAuditable {
    id: TEntityId

    organization_id: TEntityId
    organization: IOrganization

    media_id?: string
    media: IMedia

    type: branchTypeEnum
    name: string
    email: string

    description?: string
    currency_id: TEntityId
    currency: ICurrency
    contact_number?: string

    address: string
    province: string
    city: string
    region: string
    barangay: string
    postal_code: string

    latitude: number
    longitude: number

    is_main_branch?: boolean

    branch_setting: IBranchSettings

    // FOR TAX
    tax_identification_number?: string
}

export type IBranchRequest = TBranchSchema

export type IBranchPaginated = IPaginatedResult<IBranch>
