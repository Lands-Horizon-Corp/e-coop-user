import { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

import MemberGenderCombobox from '@e-coop-monorepo/modules/member-gender/components/member-gender-combobox'
import CivilStatusCombobox from '@e-coop-monorepo/modules/member-profile/components/comboboxes/civil-status-combobox'
import { serverRequestErrExtractor } from '@e-coop-monorepo/shared/helpers'
import { Button } from '@e-coop-monorepo/ui/components/ui/button'
import FormFieldWrapper from '@e-coop-monorepo/ui/components/ui/form-field-wrapper'
import { Input } from '@e-coop-monorepo/ui/components/ui/input'
import InputDate from '@e-coop-monorepo/ui/components/ui/input-date'
import { User } from 'lucide-react'

import { useKYCVerifyPersonalDetails } from '../../kyc.service'
import { TKYCVerifyPersonalInfoSchema } from '../../kyc.validation'

interface PersonalInfoStepProps {
    form: UseFormReturn<TKYCVerifyPersonalInfoSchema>
    onNext: () => void
}

export const PersonalDetailSection = ({
    form,
    onNext,
}: PersonalInfoStepProps) => {
    const { handleSubmit } = form

    const KYCVerifyMutation = useKYCVerifyPersonalDetails()

    const onSubmit = async () => {
        const success = await form.trigger()
        if (success)
            toast.promise(KYCVerifyMutation.mutateAsync(form.getValues()), {
                loading: 'verifying...',
                success: () => {
                    const { first_name, middle_name, last_name, suffix } =
                        form.getValues()
                    form.setValue(
                        'full_name' as keyof TKYCVerifyPersonalInfoSchema,
                        `${first_name || ''} ${middle_name || ''} ${last_name || ''} ${suffix || ''}`
                    )
                    onNext()
                    return 'success'
                },
                error: (error) => serverRequestErrExtractor({ error }),
            })
    }

    return (
        <section className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                    Personal Information
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Tell us about yourself, We need to know who you are and your
                    details.
                </p>
            </div>

            <div className="space-y-4">
                <FormFieldWrapper
                    control={form.control}
                    label="Username *"
                    name="username"
                    render={({ field }) => (
                        <Input
                            {...field}
                            autoComplete="off"
                            placeholder="Choose a username"
                        />
                    )}
                />

                <FormFieldWrapper
                    control={form.control}
                    label="First Name *"
                    name="first_name"
                    render={({ field }) => (
                        <Input
                            {...field}
                            autoComplete="off"
                            placeholder="Enter your first name"
                        />
                    )}
                />

                <FormFieldWrapper
                    control={form.control}
                    label="Last Name *"
                    name="last_name"
                    render={({ field }) => (
                        <Input
                            {...field}
                            autoComplete="off"
                            placeholder="Enter your last name"
                        />
                    )}
                />

                <FormFieldWrapper
                    control={form.control}
                    label="Middle Name (Optional)"
                    name="middle_name"
                    render={({ field }) => (
                        <Input
                            {...field}
                            autoComplete="off"
                            placeholder="Enter your middle name"
                        />
                    )}
                />

                <FormFieldWrapper
                    control={form.control}
                    label="Suffix"
                    name="suffix"
                    render={({ field }) => (
                        <Input
                            {...field}
                            autoComplete="off"
                            placeholder="Suffix"
                            value={field.value || ''}
                        />
                    )}
                />
                <FormFieldWrapper
                    className="relative"
                    control={form.control}
                    description="mm/dd/yyyy"
                    descriptionClassName="absolute top-0 right-0"
                    label="Date of Birth *"
                    name="birthdate"
                    render={({ field }) => (
                        <InputDate {...field} value={field.value ?? ''} />
                    )}
                />
                <FormFieldWrapper
                    control={form.control}
                    label="Civil Status *"
                    name="civil_status"
                    render={({ field }) => (
                        <CivilStatusCombobox
                            {...field}
                            id={field.name}
                            placeholder="Civil Status"
                        />
                    )}
                />

                <FormFieldWrapper
                    control={form.control}
                    label="Gender *"
                    name="member_gender_id"
                    render={({ field }) => (
                        <MemberGenderCombobox
                            {...field}
                            branchId={form.getValues(
                                'branch_id' as keyof TKYCVerifyPersonalInfoSchema
                            )}
                            mode="branch-id"
                            onChange={(selected) => {
                                form.setValue('member_gender', selected)
                                field.onChange(selected.id)
                            }}
                            placeholder="Select Gender"
                        />
                    )}
                />
            </div>

            <Button
                className="w-full"
                onClick={handleSubmit(onSubmit)}
                size="lg"
                type="button"
            >
                Continue
            </Button>
        </section>
    )
}

export default PersonalDetailSection
