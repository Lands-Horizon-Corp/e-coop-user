import type z from 'zod'

import type { IBaseEntityMeta, IPaginatedResult } from '@ecoop/shared/types'
import type { TIcon } from '@ecoop/ui/core'

import type { TagTemplateSchema } from './tag-template.validation'
import type { TAG_CATEGORY } from './tag.constants'

export type TTagCategory = (typeof TAG_CATEGORY)[number]

export interface ITagTemplate extends IBaseEntityMeta {
    name: string
    description: string
    category: TTagCategory
    color: string
    icon: TIcon
}

export type ITagTemplateRequest = z.infer<typeof TagTemplateSchema>

export type ITagTemplatePaginated = IPaginatedResult<ITagTemplate>
