import { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

import { cn } from '@/helpers'
import { serverRequestErrExtractor } from '@/helpers/error-message-extractor'
import {
    ChecklistTemplate,
    ValueChecklistMeter,
} from '@/modules/auth/components/value-checklist-indicator'
import { Lock } from 'lucide-react'

import { EmailIcon, VerifiedPatchIcon } from '@e-coop-monorepo/ui/components/icons'
import { Button } from '@e-coop-monorepo/ui/components/ui/button'
import { FormItem } from '@e-coop-monorepo/ui/components/ui/form'
import FormFieldWrapper from '@e-coop-monorepo/ui/components/ui/form-field-wrapper'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@e-coop-monorepo/ui/components/ui/input-group'
import PasswordInput from '@e-coop-monorepo/ui/components/ui/password-input'
import { PhoneInput } from '@e-coop-monorepo/ui/components/ui/phone-input'

import { TKYCVerifySecurityDetailsSchema, useKYCSecurityDetails } from '../..'

interface SecurityDetailSectionProps {
    form: UseFormReturn<TKYCVerifySecurityDetailsSchema>
    onNext: () => void
    onBack: () => void
}

export const SecurityDetailSection = ({
    form,
    onNext,
}: SecurityDetailSectionProps) => {
    const { handleSubmit, trigger, getValues } = form
    const KYCUpdateMutation = useKYCSecurityDetails()

    const onSubmit = async () => {
        const success = await trigger()
        if (success) {
            toast.promise(KYCUpdateMutation.mutateAsync(getValues()), {
                loading: 'Checking...',
                success: () => {
                    onNext()
                    return 'Security details checked'
                },
                error: (error) => serverRequestErrExtractor({ error }),
            })
        }
    }

    return (
        <section className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                    Security Details
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Secure your account
                </p>
            </div>

            <div className="space-y-4">
                <FormFieldWrapper
                    control={form.control}
                    label="Email *"
                    name="email"
                    render={({ field }) => (
                        <InputGroup>
                            <InputGroupAddon>
                                <EmailIcon />
                            </InputGroupAddon>
                            <InputGroupInput
                                {...field}
                                onChange={(e) => {
                                    if (
                                        e.target.value !==
                                        form.getValues(
                                            'verified_email' as keyof TKYCVerifySecurityDetailsSchema
                                        )
                                    )
                                        form.setValue(
                                            'verified_email' as keyof TKYCVerifySecurityDetailsSchema,
                                            undefined as unknown as string
                                        )
                                    field.onChange(e)
                                }}
                                placeholder="Enter your email"
                                type="email"
                            />
                        </InputGroup>
                    )}
                />

                <FormFieldWrapper
                    control={form.control}
                    label="Phone *"
                    name="contact_number"
                    render={({ field, fieldState: { invalid, error } }) => (
                        <div className="relative flex flex-1 items-center gap-x-2">
                            <VerifiedPatchIcon
                                className={cn(
                                    'absolute right-2 top-1/2 z-20 size-4 -translate-y-1/2 text-primary delay-300 duration-300 ease-in-out',
                                    (invalid || error) && 'text-destructive'
                                )}
                            />
                            <PhoneInput
                                {...field}
                                className="w-full"
                                defaultCountry="PH"
                                onChange={(val) => {
                                    if (
                                        val !==
                                        form.getValues(
                                            'verified_contact_number' as keyof TKYCVerifySecurityDetailsSchema
                                        )
                                    )
                                        form.setValue(
                                            'verified_contact_number' as keyof TKYCVerifySecurityDetailsSchema,
                                            undefined as unknown as string
                                        )
                                    field.onChange(val)
                                }}
                            />
                        </div>
                    )}
                />

                <FormFieldWrapper
                    control={form.control}
                    label="New Password *"
                    name="password"
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
                    name="password_confirmation"
                    render={({ field }) => (
                        <PasswordInput
                            {...field}
                            autoComplete="confirm-password"
                            defaultVisibility
                            id={field.name}
                            placeholder="Re-type password"
                        />
                    )}
                />
            </div>

            <div className="flex gap-3">
                <Button
                    className="flex-1"
                    onClick={handleSubmit(onSubmit)}
                    type="button"
                >
                    Continue
                </Button>
            </div>
        </section>
    )
}

export default SecurityDetailSection
