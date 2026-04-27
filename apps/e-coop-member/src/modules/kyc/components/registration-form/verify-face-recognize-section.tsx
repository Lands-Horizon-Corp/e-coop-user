import { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

import { useUploadMedia } from '@e-coop-monorepo/modules/media'
import { toDateTimeFormatFile } from '@e-coop-monorepo/shared/helpers'
import { cn } from '@e-coop-monorepo/shared/helpers/tw-utils'
import { useCamera } from '@e-coop-monorepo/shared/hooks'
import { TEntityId } from '@e-coop-monorepo/shared/types'
import {
    CheckFillIcon,
    FingerPrintIcon,
    RotateLeftIcon,
} from '@e-coop-monorepo/ui/components/icons'
import { Button } from '@e-coop-monorepo/ui/components/ui/button'
import { ScanFace } from 'lucide-react'
import Webcam from 'react-webcam'

import { useKYCVerifySelfie } from '../..'
import { IKYCSelfieRequest } from '../../kyc.types'

interface VerifyFaceRecognitionSectionProps {
    form: UseFormReturn<IKYCSelfieRequest>
    onNext: () => void
    onBack: () => void
}

export const VerifyFaceRecognitionSection = ({
    form,
    onNext,
}: VerifyFaceRecognitionSectionProps) => {
    const { camRef, captureImageToFile } = useCamera()

    const selfieMedia = form.watch('selfie_media')
    const scanComplete = !!selfieMedia

    const uploadMediaMutation = useUploadMedia({
        options: {},
    })

    const KYCVerifySelfieMutation = useKYCVerifySelfie()

    const isPending =
        uploadMediaMutation.isPending || KYCVerifySelfieMutation.isPending

    const handleStartSelfieScan = async () => {
        if (isPending) return

        const image = captureImageToFile({
            captureFileName: `selfie_${toDateTimeFormatFile(new Date())}`,
        })

        if (!image) {
            toast.warning('Failed to capture selfie')
            return
        }

        toast.promise(
            KYCVerifySelfieMutation.mutateAsync(
                { file: image },
                {
                    onSuccess: () => {
                        toast.promise(
                            uploadMediaMutation.mutateAsync(
                                { file: image },
                                {
                                    onSuccess: (media) => {
                                        form.setValue('selfie_media', media)
                                        form.setValue(
                                            'selfie_media_id',
                                            media.id
                                        )
                                        onNext()
                                    },
                                }
                            ),
                            {
                                loading: 'Verifying selfie',
                                error: 'Failed to verify selfie',
                            }
                        )
                    },
                }
            ),
            {
                loading: 'Verifying selfie',
                error: 'Failed to verify selfie',
            }
        )

        // if (!selfieMedia) {
        //     toast.promise(uploadMediaMutation.mutateAsync({ file: image }), {
        //         loading: 'Uploading selfie',
        //         error: 'Failed to upload selfie',
        //     })
        // }
    }

    const handleRetake = () => {
        if (isPending) return

        form.setValue('selfie_media', undefined)
        form.setValue('selfie_media_id', undefined as unknown as TEntityId)
    }

    return (
        <section className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ScanFace className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Face Recognition</h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Let coop know you by providing a quick facial scan
                </p>
            </div>

            <div className="flex justify-center">
                <div
                    className={cn(
                        'relative size-64 rounded-full border-2 flex items-center justify-center transition-all duration-300',
                        scanComplete
                            ? 'border-primary'
                            : 'border-muted-foreground'
                    )}
                >
                    {!scanComplete && (
                        <>
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-full" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-full" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-full" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-full" />
                        </>
                    )}

                    <div
                        className={cn(
                            'relative size-60 rounded-full overflow-hidden bg-muted transition-all',
                            scanComplete ? 'bg-primary/10' : 'bg-muted'
                        )}
                    >
                        {!scanComplete && (
                            <Webcam
                                audio={false}
                                className="absolute inset-0 h-full w-full object-cover scale-110"
                                ref={camRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={{ facingMode: 'user' }}
                            />
                        )}

                        {scanComplete && selfieMedia?.download_url && (
                            <img
                                alt="Selfie preview"
                                className="absolute inset-0 h-full w-full object-cover scale-110"
                                src={selfieMedia.download_url}
                            />
                        )}

                        {scanComplete && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/60 backdrop-blur-sm">
                                <CheckFillIcon className="size-12 text-primary mb-1" />
                                <p className="text-sm font-medium text-primary">
                                    Verified
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center gap-y-3">
                {!scanComplete ? (
                    <Button
                        className="w-fit mx-auto"
                        disabled={isPending}
                        onClick={handleStartSelfieScan}
                        size="sm"
                        variant="outline"
                    >
                        <FingerPrintIcon className="size-4 mr-2" />
                        Scan Face Selfie
                    </Button>
                ) : (
                    <Button
                        className="w-fit mx-auto"
                        disabled={isPending}
                        onClick={handleRetake}
                        size="sm"
                        variant="outline"
                    >
                        <RotateLeftIcon className="size-4 mr-2" />
                        Retake Scan
                    </Button>
                )}

                <p className="text-xs text-center text-muted-foreground">
                    Make sure you're in a well-lit area and your face is clearly
                    visible
                </p>
            </div>

            <div className="flex gap-3 pt-4">
                <Button
                    className="flex-1"
                    disabled={!scanComplete || isPending}
                    onClick={onNext}
                >
                    Continue
                </Button>
            </div>
        </section>
    )
}

export default VerifyFaceRecognitionSection
