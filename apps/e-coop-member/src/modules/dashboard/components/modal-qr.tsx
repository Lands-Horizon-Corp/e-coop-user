import { QrCode } from '@ecoop/ui/core'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@ecoop/ui/core'
import QRCode from 'react-qr-code'

interface QrCodeModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    qrData: string
    accountName: string
}
const QrCodeModal = ({
    open,
    onOpenChange,
    qrData,
    accountName,
}: QrCodeModalProps) => {
    return (
        <Dialog onOpenChange={onOpenChange} open={open}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>QR Code for {accountName}</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        Scan this code to easily deposit funds to this account.
                    </p>
                </DialogHeader>
                <div className="flex justify-center p-6">
                    {/* The QrCode component handles the 'value' (qrData) content check internally */}
                    {/* The QR code background styling (bg-white p-4) is now handled inside your custom QrCode component */}
                    <QrCode
                        className="size-64" // You can adjust the size here via className
                        value={qrData}
                    />
                </div>
                <div className="text-center text-xs text-muted-foreground break-all">
                    Data: {qrData}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default QrCodeModal
