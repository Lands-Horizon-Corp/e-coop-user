import type { IOrganization } from '@ecoop/modules/organization'
import type { IAuditable, ITimeStamps, TEntityId } from '@ecoop/shared/types'

import type { ICategory } from '../category'

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
