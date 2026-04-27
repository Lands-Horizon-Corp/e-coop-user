import z from 'zod'

import { IMemberType } from '@e-coop-monorepo/modules/member-type'
import { IMutualFund } from '@e-coop-monorepo/modules/mutual-fund'
import {
    IBaseEntityMeta,
    IPaginatedResult,
} from '@e-coop-monorepo/shared/types'

import { MutualFundAdditionalMembersSchema } from './mutual-fund-additional-members.validation'

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
