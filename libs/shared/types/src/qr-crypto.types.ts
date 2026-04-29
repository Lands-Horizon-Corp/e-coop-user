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
