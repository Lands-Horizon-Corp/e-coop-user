import type { IMedia } from '@e-coop-monorepo/modules/media'
import type { IBaseEntityMeta, TEntityId } from '@e-coop-monorepo/shared/types'

export interface IVoucherPayToRequest {
    name?: string
    media_id?: TEntityId
    description?: string
}

export interface IVoucherPayTo extends IBaseEntityMeta {
    id: TEntityId
    name: string
    media_id?: TEntityId
    media?: IMedia
    description: string
}
