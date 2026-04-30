import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import { allErrorMessageExtractor } from '@e-coop-monorepo/shared/helpers'
import { useFormHelper } from '@e-coop-monorepo/shared/hooks'
import { cn } from '@e-coop-monorepo/shared/tw-utils'
import type { IClassProps, IForm } from '@e-coop-monorepo/shared/types'
import { FingerPrintIcon } from '@e-coop-monorepo/ui/core'
import LoadingSpinner from '@e-coop-monorepo/ui/core'
import { Button } from '@e-coop-monorepo/ui/core'
import { Form, FormItem } from '@e-coop-monorepo/ui/core'
import FormErrorMessage from '@e-coop-monorepo/ui/core'
import FormFieldWrapper from '@e-coop-monorepo/ui/core'
import PasswordInput from '@e-coop-monorepo/ui/core'

import type { IUserPasswordResetRequest } from '../../auth-types'
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
        toast.promise(mutateAsync(formData), {
            loading: 'Wait..',
            success: 'Your new password has been saved.',
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
