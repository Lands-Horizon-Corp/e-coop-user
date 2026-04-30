import { useMemo, useState } from 'react'

import { toast } from 'sonner'

import type { IMedia } from '@e-coop-monorepo/modules/media'
import { useUploadMedia } from '@e-coop-monorepo/modules/media'
import { calculateUploadProgress } from '@e-coop-monorepo/shared/helpers'

import Signature from '.'
import { ImageDisplay } from '../image-display'
import type { IModalProps } from '../modals/modal'
import Modal from '../modals/modal'
import { Button } from '../ui/button'
import FileItem from '../uploaders/file-item'

interface Props {
    onSignatureUpload: (signatureMedia: IMedia) => void
}

const SignaturePickerUploader = ({ onSignatureUpload }: Props) => {
    const [eta, setEta] = useState('')
    const [progress, setProgress] = useState(0)
    const [file, setFile] = useState<File | undefined>(undefined)

    const objectUrl = useMemo(
        () => (file ? URL.createObjectURL(file) : undefined),
        [file]
    )

    const { isPending: isUploading, mutate: uploadSignature } = useUploadMedia({
        options: {
            onSuccess: (media) => {
                onSignatureUpload?.(media)
            },
        },
        onProgress: (progressEvent) => {
            const calculated = calculateUploadProgress(progressEvent)
            if (!calculated) return

            setProgress(calculated.progress)
            setEta(calculated.etaFormatted)
        },
    })

    return (
        <div className="space-y-2">
            {file ? (
                <>
                    <ImageDisplay
                        className="min-h-60 w-full rounded-lg border !bg-white"
                        fallbackClassName="rounded-none"
                        imageClassName="object-contain rounded-none"
                        src={objectUrl}
                    />
                    <FileItem
                        file={file}
                        onRemoveFile={() => setFile(undefined)}
                        uploadDetails={{ eta, progress, isUploading }}
                    />
                    <Button
                        className="w-full"
                        onClick={async () => {
                            try {
                                // const base64 = await fileToBase64(file)
                                uploadSignature({ file })
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            } catch (err) {
                                toast.error('Failed to upload file')
                            }
                        }}
                        type="button"
                    >
                        Upload Signature
                    </Button>
                </>
            ) : (
                <Signature
                    className=" border-0 bg-transparent p-0"
                    hideDownload
                    onSignatureChange={(signature) => setFile(signature)}
                />
            )}
        </div>
    )
}

export const SignaturePickerUploaderModal = ({
    signatureUploadProps,
    ...other
}: IModalProps & { signatureUploadProps: Props }) => {
    return (
        <Modal {...other}>
            <SignaturePickerUploader {...signatureUploadProps} />
        </Modal>
    )
}

export default SignaturePickerUploader
