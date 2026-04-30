import type z from 'zod'

import type { IUser, TUserType } from '@e-coop-monorepo/modules/user'
import type {
    IBaseEntityMeta,
    IPaginatedResult,
    TEntityId,
} from '@e-coop-monorepo/shared/types'

import type { NOTIFICATION_TYPE } from './notification.constant'
import type { NotificationSchema } from './notification.validation'

export type TNotificationType = (typeof NOTIFICATION_TYPE)[number]

export interface INotification extends IBaseEntityMeta {
    user_id: TEntityId
    user: IUser
    title: string
    description: string
    is_viewed: boolean
    notification_type: TNotificationType
    recipient_id?: TEntityId
    recipient?: IUser
    user_type?: TUserType
}

export type INotificationRequest = z.infer<typeof NotificationSchema>

export type INotificationPaginated = IPaginatedResult<INotification>

export type INotificationViewRequest = { ids: TEntityId[] }
