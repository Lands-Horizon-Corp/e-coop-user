import { useEffect, useState } from 'react'

import { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

import { serverRequestErrExtractor } from '@e-coop-monorepo/shared/helpers'
import { cn } from '@e-coop-monorepo/shared/tw-utils'
import { Button } from '@e-coop-monorepo/ui/core'
import FormFieldWrapper from '@e-coop-monorepo/ui/core'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@e-coop-monorepo/ui/core'
import { Mail } from 'lucide-react'

import {
    TKYCVerifyEmailSchema,
    useKYCResendEmailOTP,
    useKYCVerifyEmail,
} from '../..'

interface VerifyEmailSectionProps {
    form: UseFormReturn<TKYCVerifyEmailSchema>
    onNext: () => void
    onBack: () => void
}

export const VerifyEmailSection = ({
    form,
    onNext,
}: VerifyEmailSectionProps) => {
    const { handleSubmit, trigger, getValues } = form
    const KYCVerifyMutation = useKYCVerifyEmail()

    const is_email_verified = !!form.getValues('verified_email')

    const onSubmit = async () => {
        const success = await trigger()
        if (success) {
            toast.promise(KYCVerifyMutation.mutateAsync(getValues()), {
                loading: 'Verifying OTP...',
                success: () => {
                    form.setValue('otp', '' as unknown as number)
                    form.setValue('verified_email', form.getValues('email'))
                    onNext()
                    return 'Email verified successfully'
                },
                error: (error) => serverRequestErrExtractor({ error }),
            })
        }
    }

    return (
        <section className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                    {is_email_verified
                        ? 'Verify your email'
                        : 'Email is verified'}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                    {is_email_verified
                        ? 'Email is verified'
                        : `Enter the 6-digit code sent to ${form.getValues('email')}`}
                </p>
            </div>

            <div className={cn(`space-y-4 `, is_email_verified && 'hidden')}>
                <FormFieldWrapper
                    className="mx-auto w-fit"
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                        <InputOTP
                            maxLength={6}
                            {...field}
                            onComplete={() => onSubmit()}
                            value={`${field.value || ''}`}
                        >
                            <InputOTPGroup className="gap-x-4">
                                <InputOTPSlot
                                    className="!rounded border !text-lg size-10"
                                    index={0}
                                />
                                <InputOTPSlot
                                    className="!rounded border !text-lg size-10"
                                    index={1}
                                />
                                <InputOTPSlot
                                    className="!rounded border !text-lg size-10"
                                    index={2}
                                />
                                <InputOTPSlot
                                    className="!rounded border !text-lg size-10"
                                    index={3}
                                />
                                <InputOTPSlot
                                    className="!rounded border !text-lg size-10"
                                    index={4}
                                />
                                <InputOTPSlot
                                    className="!rounded border !text-lg size-10"
                                    index={5}
                                />
                            </InputOTPGroup>
                        </InputOTP>
                    )}
                />
            </div>

            <ResendEmailCode
                email={form.getValues('email')}
                full_name={
                    form.getValues(
                        'full_name' as keyof TKYCVerifyEmailSchema
                    ) as string
                }
                password={
                    form.getValues(
                        'password' as keyof TKYCVerifyEmailSchema
                    ) as string
                }
            />

            <div className="flex gap-3">
                {is_email_verified ? (
                    <Button className="flex-1" onClick={onNext} type="button">
                        Next
                    </Button>
                ) : (
                    <Button
                        className="flex-1"
                        onClick={handleSubmit(onSubmit)}
                        type="button"
                    >
                        Verify
                    </Button>
                )}
            </div>
        </section>
    )
}

const ResendEmailCode = ({
    email,
    full_name,
    password,
}: {
    email: string
    full_name: string
    password: string
}) => {
    const [disabled, setDisabled] = useState(false)
    const [countdown, setCountdown] = useState(0)

    const ResendEmailMutation = useKYCResendEmailOTP({
        options: {
            onSuccess: () => {
                setDisabled(true)
                setCountdown(10)
            },
            onError: () => {
                setDisabled(false)
            },
        },
    })

    const handleResend = async () => {
        setDisabled(true)
        toast.promise(
            ResendEmailMutation.mutateAsync({ email, full_name, password }),
            {
                loading: 'Resending...',
                success: 'OTP Sent',
                error: (error) => serverRequestErrExtractor({ error }),
            }
        )
    }

    useEffect(() => {
        if (countdown <= 0) {
            setDisabled(false)
            return
        }
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
        return () => clearTimeout(timer)
    }, [countdown])

    return (
        <p className="text-center text-sm text-muted-foreground mt-2">
            <a
                className={`cursor-pointer text-primary hover:underline ${disabled ? 'pointer-events-none text-muted-foreground' : ''}`}
                onClick={handleResend}
            >
                Resend Code {disabled && `(${countdown}s)`}
            </a>
        </p>
    )
}

export default VerifyEmailSection
