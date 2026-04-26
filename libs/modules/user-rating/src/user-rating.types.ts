import { IBaseEntityMeta, TEntityId } from '@e-coop-monorepo/shared/types'

import { IUser } from '@e-coop-monorepo/modules/user'

export interface IUserRatingRequest {
    id?: TEntityId
    ratee_user_id: TEntityId
    rater_user_id: TEntityId
    rate: number
    remark?: string
}

export interface IUserRating extends IBaseEntityMeta {
    id: TEntityId
    ratee_user_id: TEntityId
    ratee_user?: IUser
    rater_user_id: TEntityId
    rater_user?: IUser
    rate: number
    remark: string
}
