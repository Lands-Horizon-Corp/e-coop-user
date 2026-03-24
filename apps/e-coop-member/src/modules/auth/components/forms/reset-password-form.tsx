import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import { cn } from '@/helpers'
import { allErrorMessageExtractor } from '@/helpers/error-message-extractor'

import { FingerPrintIcon } from '@/components/icons'
import LoadingSpinner from '@/components/spinners/loading-spinner'
import { Button } from '@/components/ui/button'
import { Form, FormItem } from '@/components/ui/form'
import FormErrorMessage from '@/components/ui/form-error-message'
import FormFieldWrapper from '@/components/ui/form-field-wrapper'
import PasswordInput from '@/components/ui/password-input'

import { useFormHelper } from '@/hooks/use-form-helper'

import { IClassProps, IForm } from '@/types'

import { IUserPasswordResetRequest } from '../../auth-types'
import { useChangePassword } from '../../auth.service'
import { ResetPasswordSchema } from '../../auth.validation'
import {
    ChecklistTemplate,
    ValueChecklistMeter,
} from '../value-checklist-indicator'

export interface ResetPasswordFormProps
    extends IClassProps, IForm<Partial<IUserPasswordResetRequest>, void> {}

const ResetPasswordForm = ({
    className,
    ...formProps
}: ResetPasswordFormProps) => {
    const form = useForm<IUserPasswordResetRequest>({
        resolver: standardSchemaResolver(ResetPasswordSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            ...formProps.defaultValues,
        },
    })

    const {
        mutateAsync,
        error: rawError,
        isPending,
        reset,
    } = useChangePassword({
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
        useFormHelper<IUserPasswordResetRequest>({
            form,
            ...formProps,
            autoSave: false,
            preventExitOnDirty: false,
        })

    const onSubmit = form.handleSubmit((formData) => {
        reset()
        toast.promise(
            mutateAsync({
                ...formData,
                resetId: formData.reset_id,
            }),
            {
                loading: 'Wait..',
                success: 'Your new password has been saved.',
                error: (error) =>
                    allErrorMessageExtractor<string>({
                        error,
                        showUnknownErrorMessage: true,
                    }) || 'unknown error',
            }
        )
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
                    <FormFieldWrapper
                        control={form.control}
                        label="New Password *"
                        name="new_password"
                        render={({ field }) => (
                            <FormItem>
                                <PasswordInput
                                    {...field}
                                    autoComplete="new-password"
                                    defaultVisibility
                                    id={field.name}
                                    placeholder="+8 Character Password"
                                />
                                <ValueChecklistMeter
                                    checkList={ChecklistTemplate[
                                        'password-checklist'
                                    ].concat([
                                        {
                                            regex: /^.{0,50}$/,
                                            text: 'No more than 50 characters',
                                        },
                                    ])}
                                    hideOnComplete
                                    value={field.value}
                                />
                            </FormItem>
                        )}
                    />
                    <FormFieldWrapper
                        control={form.control}
                        label="Confirm Password *"
                        name="confirm_password"
                        render={({ field }) => (
                            <FormItem>
                                <PasswordInput
                                    {...field}
                                    autoComplete="new-password"
                                    defaultVisibility
                                    id={field.name}
                                    placeholder="Confirm Password"
                                />
                            </FormItem>
                        )}
                    />
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

export default ResetPasswordForm
