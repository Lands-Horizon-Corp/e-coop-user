import { IUserBase } from '@e-coop-monorepo/modules/user'
import { TEntityId } from '@e-coop-monorepo/shared/types'

export interface IMediaRequest {
    id?: TEntityId
    file_name: string
    file_size: number
    fileType: string
    storageKey: string
    key?: string
    bucketName?: string

    userId?: TEntityId
    user?: IUserBase
}
