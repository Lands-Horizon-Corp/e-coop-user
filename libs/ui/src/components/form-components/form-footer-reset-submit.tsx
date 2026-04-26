import { MouseEvent } from 'react'

import { cn } from '@e-coop-monorepo/shared/helpers'
import useConfirmModalStore from '@e-coop-monorepo/shared/store'
import { IClassProps } from '@e-coop-monorepo/shared/types'

import LoadingSpinner from '@e-coop-monorepo/ui'
import { Button } from '@e-coop-monorepo/ui'
import FormErrorMessage from '@e-coop-monorepo/ui'
import { Separator } from '@e-coop-monorepo/ui'

interface IFormResetSubmitFooterProps extends IClassProps {
    readOnly?: boolean
    isLoading?: boolean
    disableSubmit?: boolean
    showSeparator?: boolean
    disableReset?: boolean

    hideReset?: boolean

    showConfirmOnReset?: boolean

    submitText?: React.ReactNode | string
    resetText?: string

    error?: string

    resetButtonType?: 'button' | 'reset'
    submitButtonType?: 'button' | 'submit'

    // additional children between buttons
    midChildren?: React.ReactNode

    resetButtonClassName?: string
    submitButtonClassName?: string

    onReset?: () => void
    onSubmit?: (e: MouseEvent<HTMLButtonElement>) => void
}

const FormFooterResetSubmit = ({
    submitText = 'Submit',
    resetText = 'Reset',
    isLoading,
    readOnly,
    className,
    disableSubmit,
    resetButtonClassName,
    submitButtonClassName,
    error,
    showSeparator = false,
    hideReset = false,
    showConfirmOnReset = true,
    disableReset,

    resetButtonType = 'button',
    submitButtonType = 'submit',

    onSubmit,
    onReset,
}: IFormResetSubmitFooterProps) => {
    const { onOpen } = useConfirmModalStore()
    return (
        <div className={cn('space-y-2 py-1 px-0', className)}>
            <FormErrorMessage errorMessage={error} />
            {showSeparator && <Separator className="my-2 sm:my-4" />}
            <div className="flex items-center justify-end gap-x-2">
                {!hideReset && (
                    <Button
                        className={cn(
                            'w-full self-end px-8 sm:w-fit',
                            resetButtonClassName
                        )}
                        disabled={
                            disableSubmit ||
                            readOnly ||
                            isLoading ||
                            disableReset
                        }
                        onClick={() => {
                            if (showConfirmOnReset) {
                                return onOpen({
                                    title: 'Reset Changes',
                                    description:
                                        'You might have unsave changes, are you sure to proceed?',
                                    onConfirm: () => onReset?.(),
                                })
                            }
                            onReset?.()
                        }}
                        size="sm"
                        type={resetButtonType}
                        variant="secondary"
                    >
                        {resetText}
                    </Button>
                )}
                <Button
                    className={cn(
                        'w-full self-end px-8 sm:w-fit',
                        submitButtonClassName
                    )}
                    disabled={isLoading || readOnly || disableSubmit}
                    onClick={onSubmit}
                    size="sm"
                    type={onSubmit !== undefined ? 'button' : submitButtonType}
                >
                    {isLoading ? <LoadingSpinner /> : submitText}
                </Button>
            </div>
        </div>
    )
}

export default FormFooterResetSubmit
