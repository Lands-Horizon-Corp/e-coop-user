import type { TPermission } from '@e-coop-monorepo/modules/permission'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
} from '@e-coop-monorepo/shared/types'

import type { TPermissionTemplateSchema } from './permission-template.validation'

export interface IPermissionTemplate extends IBaseEntityMeta {
    name: string
    description: string
    permissions: TPermission[]
}

export type IPermissionTemplateRequest = TPermissionTemplateSchema

export type IPermissionTemplatePaginated = IPaginatedResult<IPermissionTemplate>

export type IPermissionTemplatePaginated = IPaginatedResult<IPermissionTemplate>
