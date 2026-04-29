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

import { branchTypeEnum } from './branch.enums'
import { TBranchSchema } from './branch.validation'

// Resource

export type IBranchRequest = TBranchSchema

export type IBranchPaginated = IPaginatedResult<IBranch>
