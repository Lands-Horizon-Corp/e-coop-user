import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import { allErrorMessageExtractor } from '@e-coop-monorepo/shared/helpers'
import { useFormHelper } from '@e-coop-monorepo/shared/hooks'
import { IForgetPasswordEntry } from '@e-coop-monorepo/shared/store'
import { cn } from '@e-coop-monorepo/shared/tw-utils'
import { IClassProps, IForm } from '@e-coop-monorepo/shared/types'
import { FingerPrintIcon } from '@e-coop-monorepo/ui'
import LoadingSpinner from '@e-coop-monorepo/ui'
import { Button } from '@e-coop-monorepo/ui'
import { Form } from '@e-coop-monorepo/ui'
import FormErrorMessage from '@e-coop-monorepo/ui'
import FormFieldWrapper from '@e-coop-monorepo/ui'
import { Input } from '@e-coop-monorepo/ui'

import { IUserForgotPasswordRequest } from '../../auth-types'
import { useForgotPassword } from '../../auth.service'
import { ForgotPasswordSchema } from '../../auth.validation'

export interface ForgotPasswordFormProps
    extends
        IClassProps,
        IForm<Partial<IUserForgotPasswordRequest>, IForgetPasswordEntry> {}

const ForgotPasswordForm = ({
    className,
    ...formProps
}: ForgotPasswordFormProps) => {
    const form = useForm<IUserForgotPasswordRequest>({
        resolver: standardSchemaResolver(ForgotPasswordSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            ...formProps.defaultValues,
            key: formProps.defaultValues?.key ?? '',
        },
    })

    const {
        mutateAsync,
        error: rawError,
        isPending,
        reset,
    } = useForgotPassword({
        options: {
            onSuccess: formProps.onSuccess,
            onError: formProps.onError,
        },
    })

    const error = allErrorMessageExtractor({
        error: rawError,
        showUnknownErrorMessage: true,
    })

    const { formRef, handleFocusError } =
        useFormHelper<IUserForgotPasswordRequest>({
            form,
            ...formProps,
            autoSave: false,
            preventExitOnDirty: false,
        })

    const onSubmit = form.handleSubmit((formData) => {
        reset()
        toast.promise(mutateAsync(formData), {
            loading: 'Wait..',
            success: 'Reset Link Generated',
            error: (error) =>
                allErrorMessageExtractor<string>({
                    error,
                    showUnknownErrorMessage: true,
                }) || 'unknown error',
        })
    }, handleFocusError)

    return (
        <Form {...form}>
            <form
                className={cn(
                    'flex w-full flex-col gap-y-4 bg-card p-5 rounded-xl',
                    className
                )}
                onSubmit={onSubmit}
                ref={formRef}
            >
                <fieldset
                    className="space-y-8"
                    disabled={isPending || formProps.readOnly}
                >
                    <div className="space-y-4">
                        <FormFieldWrapper
                            control={form.control}
                            label="Email/Contact *"
                            name="key"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    autoComplete="email"
                                    id={field.name}
                                    placeholder="example@email.com"
                                />
                            )}
                        />
                    </div>
                </fieldset>

                <div className="space-y-2 py-1">
                    <FormErrorMessage className="py-1" errorMessage={error} />
                    <div className="flex items-center justify-end">
                        <Button
                            className="w-full self-end font-bold"
                            disabled={isPending || formProps.readOnly}
                            onClick={onSubmit}
                            size="sm"
                        >
                            {isPending ? (
                                <LoadingSpinner />
                            ) : (
                                <>
                                    <FingerPrintIcon className="mr-1" /> Request
                                    Reset
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default ForgotPasswordForm
