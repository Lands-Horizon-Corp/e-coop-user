import type z from 'zod'

import type { IMemberType } from '@e-coop-monorepo/modules/member-type'
import type { IMutualFund } from '@e-coop-monorepo/modules/mutual-fund'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
} from '@e-coop-monorepo/shared/types'

import type { MutualFundAdditionalMembersSchema } from './mutual-fund-additional-members.validation'

export interface IMutualFundAdditionalMembers extends IBaseEntityMeta {
    mutual_fund_id: string
    mutual_fund?: IMutualFund

    member_type_id: string
    member_type?: IMemberType

    number_of_members: number
    ratio: number
}

export type IMutualFundAdditionalMembersRequest = z.infer<
    typeof MutualFundAdditionalMembersSchema
>

export type IMutualFundAdditionalMembersPaginated =
    IPaginatedResult<IMutualFundAdditionalMembers>
