import type { ICategory } from '@e-coop-monorepo/modules/category'
import type { IOrganization } from '@e-coop-monorepo/modules/organization'
import type {
    IAuditable,
    ITimeStamps,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

export interface IOrganizationCategory extends ITimeStamps, IAuditable {
    id: TEntityId
    organization_id: TEntityId
    organization: IOrganization
    name: string
    category_id: TEntityId
    category: ICategory
}

export interface IOrganizationCategoryRequest {
    id?: TEntityId
    category_id: TEntityId
}
