import { IAccount } from '@e-coop-monorepo/modules/account'
import { TTagCategory } from '@e-coop-monorepo/modules/tag-template'
import {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

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
