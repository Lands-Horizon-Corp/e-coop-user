import z from 'zod'

import {
    IBaseEntityMeta,
    IPaginatedResult,
} from '@e-coop-monorepo/shared/types'

import { CashCheckVoucherTagSchema } from './cash-check-voucher-tag.validation'

export interface ICashCheckVoucherTag extends IBaseEntityMeta {
    name: string
    description: string
    color: string
    icon: string
}

export type ICashCheckVoucherTagRequest = z.infer<
    typeof CashCheckVoucherTagSchema
>

export type ICashCheckVoucherTagPaginated =
    IPaginatedResult<ICashCheckVoucherTag>
