import type { IAccount } from '../account/account.types'
import type { TTagCategory } from '@ecoop/modules/tag-template'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@ecoop/shared/types'

export interface IAccountTag extends IBaseEntityMeta {
    account_id: TEntityId
    acount: IAccount

    name: string
    description: string
    category: TTagCategory
    color: string
    icon: string
}

export interface IAccounTagRequest {
    account_id: TEntityId
    name: string
    description?: string
    category: TTagCategory
    color?: string
    icon?: string
}

export type IAccountTagPaginated = IPaginatedResult<IAccountTag>
