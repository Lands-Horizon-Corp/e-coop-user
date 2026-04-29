import { IAuditable, IMedia, IQrScanResult, ITimeStamps, TEntityId } from '.'
import { USER_TYPE } from './user.constants'

export type TUserType = (typeof USER_TYPE)[number] // move User module

export interface IUserBase extends ITimeStamps, IAuditable {
    id: TEntityId
    media_id?: TEntityId
    media?: IMedia
    api_key: string
    password: string
    birthdate?: string
    user_name: string
    first_name?: string
    middle_name?: string
    last_name?: string
    full_name: string
    suffix?: string
    email: string
    is_email_verified?: boolean
    type?: TUserType
    contact_number: string
    is_contact_verified?: boolean
    qr_code: IQrScanResult<string, 'user-qr'>
}
