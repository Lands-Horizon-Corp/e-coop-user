import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import type { IMemberProfile } from '@ecoop/domains/member-crm'
import { allErrorMessageExtractor } from '@ecoop/shared/helpers'
import { useFormHelper } from '@ecoop/shared/hooks'
import { cn } from '@ecoop/shared/tw-utils'
import type { IClassProps, IForm } from '@ecoop/shared/types'
import { FingerPrintIcon } from '@ecoop/ui/core'
import LoadingSpinner from '@ecoop/ui/core'
import { Button } from '@ecoop/ui/core'
import { Form, FormItem } from '@ecoop/ui/core'
import FormErrorMessage from '@ecoop/ui/core'
import FormFieldWrapper from '@ecoop/ui/core'
import { Input } from '@ecoop/ui/core'
import PasswordInput from '@ecoop/ui/core'

import type { IUserLoginRequest } from '../../auth-types'
import { useSignIn } from '../../auth.service'
import { UserLoginRequestSchema } from '../../auth.validation'

export interface LoginFormProps
    extends IClassProps, IForm<Partial<IUserLoginRequest>, IMemberProfile> {}

const LoginForm = ({ className, ...formProps }: LoginFormProps) => {
    const form = useForm<IUserLoginRequest>({
        resolver: standardSchemaResolver(UserLoginRequestSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            ...formProps.defaultValues,
            key: '',
            password: '',
        },
    })

    const {
        mutateAsync,
        error: rawError,
        isPending,
        reset,
    } = useSignIn({
        options: {
            onSuccess: formProps.onSuccess,
            onError: formProps.onError,
        },
    })

    const error = allErrorMessageExtractor<string>({
        error: rawError,
        showUnknownErrorMessage: true,
    })

    const { formRef, handleFocusError } = useFormHelper<IUserLoginRequest>({
        form,
        ...formProps,
        autoSave: false,
        preventExitOnDirty: false,
    })

    const onSubmit = form.handleSubmit((formData) => {
        reset()
        toast.promise(
            mutateAsync(formData, {
                onSuccess: (data) => {
                    form.reset(data)
                },
            }),
            {
                loading: 'Logging you in',
                success: 'Logged in, welcome!',
                error: (error) =>
                    allErrorMessageExtractor<string>({
                        error,
                        showUnknownErrorMessage: true,
                    }),
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
                        <FormFieldWrapper
                            control={form.control}
                            label={
                                <>
                                    <span>Password *</span>
                                    <Link
                                        className="text-muted-foreground hover:text-primary hover:underline hover:border-b border-b-transparent border-b ease-in-out duration-100"
                                        key={form.watch('key')}
                                        search={{ key: form.getValues('key') }}
                                        to="/auth/forgot-password"
                                    >
                                        Forgot Password?
                                    </Link>
                                </>
                            }
                            labelClassName="text-xs flex justify-between"
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <PasswordInput
                                        {...field}
                                        autoComplete="new-password"
                                        defaultVisibility={false}
                                        id={field.name}
                                        placeholder="+8 Character Password"
                                    />
                                </FormItem>
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
                                    <FingerPrintIcon className="mr-1" /> Sign In
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default LoginForm
