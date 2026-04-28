import { IBranchSettings } from '@e-coop-monorepo/modules/branch-settings'
import { ICurrency } from '@e-coop-monorepo/modules/currency'
import { IMedia } from '@e-coop-monorepo/modules/media'
import { IOrganization } from '@e-coop-monorepo/modules/organization'
import {
    IAuditable,
    IPaginatedResult,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import { TBranchSchema } from './branch.validation'
import { branchTypeEnum } from './branch.enums'

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
