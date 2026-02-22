import { TEntityId } from '@/types'

// Type of QR content identifier
export type TQrContentType =
    | 'unknown-qr'
    | 'invitation-code-qr'
    | 'user-qr'
    | 'member-qr'

// Raw JSON-parsed QR scan result
export type IQrScanResult<
    TData = unknown,
    TContentType extends TQrContentType = 'unknown-qr',
> = {
    type: TContentType
    data: TData
}

export interface IQrMemberIdData {
    id: TEntityId
}
export interface IQRUser {
    user_id: string
    email: string
    contact_number: string
    user_name: string
    name: string
    lastname: string
    firstname: string
    middlename: string
}

export interface IQRInvitationCode {
    organization_id: string
    branch_id: string
    UserType: string
    Code: string
    CurrentUse: number
    Description: string
}

export interface IQRMemberProfile {
    full_name: string
    firstname: string
    lastname: string
    middlename: string
    contact_number: string
    member_profile_id: string
    branch_id: string
    organization_id: string
    email: string
}

export type IQrUserDecodedResult = IQrScanResult<
    IQrMemberIdData,
    'user-qr'
>

export type IQrInvitationCodeDecodedResult = IQrScanResult<
    IQRInvitationCode,
    'invitation-code-qr'
>

export type IQRMemberProfileDecodedResult = IQrScanResult<
    IQRMemberProfile,
    'member-qr'
>

export interface IOperationCallbacks<
    TDataSuccess = unknown,
    TRawError = unknown,
> {
    onSuccess?: (data: TDataSuccess) => void
    onError?: (error: string, rawError?: TRawError) => void
}
