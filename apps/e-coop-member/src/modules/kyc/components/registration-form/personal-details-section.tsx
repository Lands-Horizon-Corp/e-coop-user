import { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

import { SEX } from '@/constants'
import { serverRequestErrExtractor } from '@/helpers/error-message-extractor'
import MemberGenderCombobox from '@/modules/member-gender/components/member-gender-combobox'
import CivilStatusCombobox from '@/modules/member-profile/components/comboboxes/civil-status-combobox'
import { CountryCombobox } from '@/modules/member-profile/components/comboboxes/country-combobox'
import SexCombobox from '@/modules/member-profile/components/comboboxes/sex-combobox'
import { User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import FormFieldWrapper from '@/components/ui/form-field-wrapper'
import { Input } from '@/components/ui/input'
import InputDate from '@/components/ui/input-date'

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

            <div className="space-y-4 ">
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
                <div className="grid grid-cols-2 gap-x-2">
                    <FormFieldWrapper
                        control={form.control}
                        label="Birth Place"
                        name="birth_place"
                        render={({ field }) => (
                            <CountryCombobox
                                {...field}
                                defaultValue={field.value}
                                onChange={(country) => {
                                    field.onChange(country?.alpha3)
                                }}
                                undefinable={false}
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
                </div>
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

                <div className="grid grid-cols-2 gap-x-2">
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

                                    if (selected.name.toLowerCase() === 'male')
                                        form.setValue('sex', 'male')

                                    if (
                                        selected.name.toLowerCase() === 'female'
                                    )
                                        form.setValue('sex', 'female')
                                }}
                                placeholder="Select Gender"
                            />
                        )}
                    />
                    {!SEX.filter((sex) => sex !== 'n/a').includes(
                        form.watch('member_gender')?.name?.toLowerCase()
                    ) && (
                        <FormFieldWrapper
                            className="col-span-1"
                            control={form.control}
                            label="Sex *"
                            name="sex"
                            render={({ field }) => (
                                <SexCombobox {...field} placeholder="Sex" />
                            )}
                        />
                    )}
                </div>
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
