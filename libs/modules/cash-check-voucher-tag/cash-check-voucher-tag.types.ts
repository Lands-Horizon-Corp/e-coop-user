import type z from 'zod'

import type { IBaseEntityMeta, IPaginatedResult } from '@ecoop/shared/types'

import type { CashCheckVoucherTagSchema } from './cash-check-voucher-tag.validation'

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
