import { useRef } from 'react'

import {
    UseDownloadOptions,
    useDownloadElement,
} from '@e-coop-monorepo/shared/hooks'
import { cn } from '@e-coop-monorepo/shared/tw-utils'
import { ChevronDownIcon, DownloadIcon } from '@e-coop-monorepo/ui'
import LoadingSpinner from '@e-coop-monorepo/ui'
import { Button } from '@e-coop-monorepo/ui'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@e-coop-monorepo/ui'

import QrCode, { IQrCodeProps } from './qr-code'

interface Props
    extends
        Omit<IQrCodeProps, 'children'>,
        Omit<UseDownloadOptions, 'fileType'> {
    containerClassName?: string
}

const QrCodeDownloadable = ({
    fileName,
    containerClassName,
    onError,
    onSuccess,
    ...other
}: Props) => {
    const qrRef = useRef<HTMLDivElement>(null)

    const { download, isDownloading } = useDownloadElement()

    return (
        <div className={cn('w-fit space-y-2', containerClassName)}>
            <QrCode ref={qrRef} {...other}></QrCode>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="w-full"
                        disabled={isDownloading}
                        size="sm"
                        variant="secondary"
                    >
                        {isDownloading ? (
                            <LoadingSpinner />
                        ) : (
                            <DownloadIcon className="mr-1 inline" />
                        )}
                        Download
                        <ChevronDownIcon className="-me-1 ms-2" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="">
                    <DropdownMenuLabel className="text-xs text-foreground/60">
                        QR Format
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() =>
                            download(qrRef.current, {
                                fileName,
                                fileType: 'png',
                                onSuccess,
                                onError,
                            })
                        }
                    >
                        PNG
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() =>
                            download(qrRef.current, {
                                fileName,
                                fileType: 'jpeg',
                                onSuccess,
                                onError,
                            })
                        }
                    >
                        JPEG
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() =>
                            download(qrRef.current, {
                                fileName,
                                fileType: 'svg',
                                onSuccess,
                                onError,
                            })
                        }
                    >
                        SVG
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default QrCodeDownloadable
