import { useCallback, useEffect, useState } from 'react'

import { type ControllerRenderProps, useForm } from 'react-hook-form'
import z from 'zod'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import { useVerifyPassword } from '@ecoop/modules/authentication'
import { serverRequestErrExtractor } from '@ecoop/shared/helpers'
import { useActionSecurityStore } from '@ecoop/shared/store'
import { ShieldCheckIcon, ShieldLockIcon } from '@ecoop/ui/core'
import { LoadingSpinner } from '@ecoop/ui/core'
import { Button } from '@ecoop/ui/core'
import { Form } from '@ecoop/ui/core'
import { FormErrorMessage } from '@ecoop/ui/core'
import { FormFieldWrapper } from '@ecoop/ui/core'
import { PasswordInput } from '@ecoop/ui/core'

import { Modal } from './modal'

const actionSecurityFormSchema = z.object({
    password: z.string().min(1, 'Password is required'),
})

type TFormType = z.infer<typeof actionSecurityFormSchema>

const ActionSecurityModal = () => {
    const [success, setSuccess] = useState(false)
    const {
        isOpen,
        modalData: { title, description, onSuccess },
        onClose,
    } = useActionSecurityStore()

    const form = useForm<TFormType>({
        resolver: standardSchemaResolver(actionSecurityFormSchema),
        reValidateMode: 'onChange',
        mode: 'onSubmit',
        defaultValues: {
            password: '',
        },
    })

    const onPasswordSuccess = useCallback(() => {
        setSuccess(true)
        setTimeout(() => {
            onClose()
            setTimeout(() => {
                onSuccess()
            }, 500)
        }, 1000)
    }, [onClose, onSuccess])

    const {
        mutate: verifyPassword,
        isPending,
        error,
    } = useVerifyPassword({
        options: {
            onSuccess: () => {
                // onClose()
                // onSuccess()
                onPasswordSuccess()
                form.reset({ password: '' })
            },
        },
    })

    useEffect(() => {
        if (success && !isOpen) {
            setTimeout(() => {
                setSuccess(false)
            }, 500)
        }
    }, [isOpen, success])

    const Error = serverRequestErrExtractor({ error })

    return (
        <Modal
            descriptionClassName="hidden"
            onOpenChange={onClose}
            open={isOpen}
            titleClassName="hidden"
        >
            <div className="flex flex-col items-center justify-center gap-y-2">
                {success ? (
                    <ShieldCheckIcon className="size-16 text-primary animate-in" />
                ) : (
                    <ShieldLockIcon className="size-16 text-orange-400 animate-out" />
                )}
                <p className="text-xl">{title}</p>
                <p className="text-muted-foreground/80">{description}</p>
            </div>
            {isPending && <LoadingSpinner className="mx-auto" />}
            {!success && !isPending && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((data) =>
                            verifyPassword(data)
                        )}
                    >
                        <fieldset
                            className="flex w-full flex-col gap-y-4"
                            disabled={isPending}
                        >
                            <FormFieldWrapper
                                control={form.control}
                                name="password"
                                render={({
                                    field,
                                }: {
                                    field: ControllerRenderProps<
                                        TFormType,
                                        'password'
                                    >
                                }) => (
                                    <PasswordInput
                                        {...field}
                                        autoComplete="off"
                                        id="password-field"
                                        placeholder="Password"
                                    />
                                )}
                            />
                            <FormErrorMessage errorMessage={Error} />

                            <div className="flex justify-end gap-x-2">
                                <Button
                                    className="w-full px-8"
                                    disabled={isPending}
                                    size="sm"
                                    type="submit"
                                >
                                    {isPending ? <LoadingSpinner /> : 'Proceed'}
                                </Button>
                            </div>
                        </fieldset>
                    </form>
                </Form>
            )}
        </Modal>
    )
}

export { ActionSecurityModal }
