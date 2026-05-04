import type { ICategory } from '@ecoop/modules/category'
import type { IOrganization } from '../organization/organization.types'
import type { IAuditable, ITimeStamps, TEntityId } from '@ecoop/shared/types'

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
