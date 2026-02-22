import { IBaseEntityMeta, IPaginatedResult } from '@/types'

import { TPermission } from '../permission/permission.types'
import { TPermissionTemplateSchema } from './permission-template.validation'

export interface IPermissionTemplate extends IBaseEntityMeta {
    name: string
    description: string
    permissions: TPermission[]
}

export type IPermissionTemplateRequest = TPermissionTemplateSchema

export type IPermissionTemplatePaginated = IPaginatedResult<IPermissionTemplate>

export type IPermissionTemplatePaginated = IPaginatedResult<IPermissionTemplate>
