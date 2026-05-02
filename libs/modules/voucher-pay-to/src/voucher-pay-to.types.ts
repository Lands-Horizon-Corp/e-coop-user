import type { IMedia } from '@ecoop/modules/media'
import type { IBaseEntityMeta, TEntityId } from '@ecoop/shared/types'

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
