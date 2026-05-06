import type { ReactElement } from 'react'
import { forwardRef, useState } from 'react'

import type { IMedia } from '@ecoop/platforms/media/models'
import { cn } from '@ecoop/shared/tw-utils'
import type { IClassProps } from '@ecoop/shared/types'
import type { ButtonProps } from '@ecoop/ui/core'
import {
    Button,
    ImageDisplay,
    ImageIcon,
    SingleImageUploaderModal,
    UploadIcon,
    XIcon,
} from '@ecoop/ui/core'

interface ImageFieldProps
    extends Omit<ButtonProps, 'onChange' | 'value'>, IClassProps {
    name?: string
    value?: IMedia
    placeholder?: string
    displayComponent?: (value?: IMedia) => ReactElement
    onChange?: (media: IMedia | undefined) => void
    isFieldView?: boolean
}

const ImageField = forwardRef<HTMLButtonElement, ImageFieldProps>(
    (
        {
            value,
            placeholder,
            className,
            onChange,
            isFieldView = false,
            ...props
        },
        ref
    ) => {
        const [open, setOpen] = useState(false)

        return (
            <>
                <SingleImageUploaderModal
                    onOpenChange={setOpen}
                    open={open}
                    singleImageUploadProps={{
                        disableCrop: true,
                        squarePreview: true,
                        defaultImage: value,
                        onUploadComplete: (media) => {
                            onChange?.(media)
                            setOpen(false)
                        },
                    }}
                    title="Upload"
                />
                <Button
                    ref={ref}
                    {...props}
                    className={cn(
                        'has-disabled:pointer-events-none has-disabled:opacity-50 relative flex h-52 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-primary/60 bg-primary/5 p-4 transition-colors hover:border-foreground hover:bg-primary/20 dark:border-primary/20 dark:bg-background/40',
                        value &&
                            'border-none border-transparent !outline-none ring ring-ring/40 dark:ring-muted-foreground/20 !outline-0',
                        '',
                        className
                    )}
                    onClick={() => setOpen(true)}
                    role="button"
                    size="nostyle"
                    type="button"
                    variant="nostyle"
                >
                    {value ? (
                        <div
                            className="absolute left-0 top-0 size-full cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ImageDisplay
                                className="block size-full rounded-none border-none outline-none"
                                src={value.download_url}
                            />
                            <span
                                className="absolute right-2 top-2 block size-fit cursor-pointer rounded-full bg-secondary p-1.5 duration-300 ease-out hover:bg-secondary/70"
                                onClick={(e) => {
                                    onChange?.(undefined)
                                    e.stopPropagation()
                                }}
                            >
                                <XIcon className="size-4" />
                            </span>
                        </div>
                    ) : (
                        <>
                            {isFieldView ? (
                                <div className="flex items-center   ">
                                    upload photo <UploadIcon className="ml-2" />
                                </div>
                            ) : (
                                <div className="flex flex-1 flex-col items-center justify-center">
                                    <div className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background">
                                        <ImageIcon />
                                    </div>
                                    {placeholder}
                                </div>
                            )}
                        </>
                    )}
                </Button>
            </>
        )
    }
)

export default ImageField
