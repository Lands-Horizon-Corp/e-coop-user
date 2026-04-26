import z from 'zod'

import {
    IBaseEntityMeta,
    IPaginatedResult,
} from '@e-coop-monorepo/shared/types'

import { TIcon } from '@e-coop-monorepo/ui'

import { TagTemplateSchema } from './tag-template.validation'
import { TAG_CATEGORY } from './tag.constants'

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
