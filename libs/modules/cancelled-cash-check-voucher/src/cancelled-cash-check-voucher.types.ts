import type z from 'zod'

import type {
    IBaseEntityMeta,
    IPaginatedResult,
} from '@e-coop-monorepo/shared/types'

import type { CancelledCashCheckVoucherSchema } from './cancelled-cash-check-voucher.validation'

export interface ICancelledCashCheckVoucher extends IBaseEntityMeta {
    check_number: string
    entry_date: string
    description?: string
}

export type ICancelledCashCheckVoucherRequest = z.infer<
    typeof CancelledCashCheckVoucherSchema
>

export type ICancelledCashCheckVoucherPaginated =
    IPaginatedResult<ICancelledCashCheckVoucher>
