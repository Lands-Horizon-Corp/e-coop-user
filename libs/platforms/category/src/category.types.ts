import type { ITimeStamps, TEntityId } from '@ecoop/shared/types'

export interface ICategory extends ITimeStamps {
    id: TEntityId
    name: string
    description?: string
}
