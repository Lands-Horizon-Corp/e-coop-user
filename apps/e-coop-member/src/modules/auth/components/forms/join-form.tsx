import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import type {
    IMemberProfile,
    IQuickCreateMemberProfile,
} from '@e-coop-monorepo/modules/member-profile'
import { QuickCreateMemberProfileSchema } from '@e-coop-monorepo/modules/member-profile'
import CivilStatusCombobox from '@e-coop-monorepo/modules/member-profile/components/comboboxes/civil-status-combobox'
import { CountryCombobox } from '@e-coop-monorepo/modules/member-profile/components/comboboxes/country-combobox'
import MemberGenderCombobox from '@e-coop-monorepo/modules/member-profile/components/comboboxes/member-gender-combobox'
import { toInputDateString } from '@e-coop-monorepo/shared/helpers'
import { serverRequestErrExtractor } from '@e-coop-monorepo/shared/helpers'
import { useFormHelper } from '@e-coop-monorepo/shared/hooks'
import { cn } from '@e-coop-monorepo/shared/tw-utils'
import type { IClassProps, IForm } from '@e-coop-monorepo/shared/types'
import FormFooterResetSubmit from '@e-coop-monorepo/ui/core'
import {
    KeySharpIcon,
    UserIcon,
    VerifiedPatchIcon,
} from '@e-coop-monorepo/ui/core'
import { Checkbox } from '@e-coop-monorepo/ui/core'
import { Form, FormItem } from '@e-coop-monorepo/ui/core'
import FormFieldWrapper from '@e-coop-monorepo/ui/core'
import { Input } from '@e-coop-monorepo/ui/core'
import InputDate from '@e-coop-monorepo/ui/core'
import { Label } from '@e-coop-monorepo/ui/core'
import PasswordInput from '@e-coop-monorepo/ui/core'
import { PhoneInput } from '@e-coop-monorepo/ui/core'
import { Separator } from '@e-coop-monorepo/ui/core'

import { useQuickRegisterMember } from '../../auth.service'
import {
    ChecklistTemplate,
    ValueChecklistMeter,
} from '../value-checklist-indicator'

export interface IJoinFormProps
    extends
        IClassProps,
        IForm<Partial<IQuickCreateMemberProfile>, IMemberProfile> {}

const JoinForm = ({ className, ...formProps }: IJoinFormProps) => {
    const form = useForm<IQuickCreateMemberProfile>({
        resolver: standardSchemaResolver(QuickCreateMemberProfileSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            key: '',
            birth_place: 'PHL',
            password: '',
            ...formProps.defaultValues,
            birthdate: toInputDateString(
                formProps.defaultValues?.birthdate ?? new Date()
            ),
        },
    })

    const {
        mutateAsync,
        error: rawError,
        isPending,
        reset,
    } = useQuickRegisterMember({
        options: {
            onSuccess: formProps.onSuccess,
            onError: formProps.onError,
            meta: { invalidates: [['member-profile']] },
        },
    })

    const error = serverRequestErrExtractor({ error: rawError })

    const { formRef, handleFocusError, isDisabled } =
        useFormHelper<IQuickCreateMemberProfile>({
            form,
            ...formProps,
            autoSave: false,
            preventExitOnDirty: false,
        })

    const onSubmit = form.handleSubmit(async (formData) => {
        const promise = toast.promise(
            mutateAsync(
                {
                    ...formData,
                    full_name: `${formData.first_name ?? ''} ${formData.middle_name ?? ''} ${formData.last_name ?? ''} ${formData.suffix ?? ''}`,
                },
                {
                    onSuccess: (data) => {
                        form.reset(data)
                    },
                }
            ),
            {
                loading: 'Creating Account',
                success: 'Account Created',
            }
        )

        return promise
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
                        <div className="space-y-2">
                            <div className="flex gap-x-2 items-center">
                                <UserIcon />
                                <p className="font-medium">
                                    Personal Information
                                </p>
                            </div>
                            <Separator />
                        </div>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-10">
                            <FormFieldWrapper
                                className="col-span-3"
                                control={form.control}
                                label="First Name *"
                                name="first_name"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        autoComplete="given-name"
                                        disabled={isDisabled(field.name)}
                                        id={field.name}
                                        placeholder="First Name"
                                    />
                                )}
                            />

                            <FormFieldWrapper
                                className="col-span-3"
                                control={form.control}
                                label="Middle Name"
                                name="middle_name"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        autoComplete="additional-name"
                                        disabled={isDisabled(field.name)}
                                        id={field.name}
                                        placeholder="Middle Name"
                                    />
                                )}
                            />

                            <FormFieldWrapper
                                className="col-span-3"
                                control={form.control}
                                label="Last Name *"
                                name="last_name"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        autoComplete="family-name"
                                        disabled={isDisabled(field.name)}
                                        id={field.name}
                                        placeholder="Last Name"
                                    />
                                )}
                            />

                            <FormFieldWrapper
                                className="col-span-1"
                                control={form.control}
                                label="Suffix"
                                name="suffix"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        autoComplete="honorific-suffix"
                                        disabled={isDisabled(field.name)}
                                        id={field.name}
                                        placeholder=""
                                    />
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <FormFieldWrapper
                                control={form.control}
                                label="Civil Status *"
                                name="civil_status"
                                render={({ field }) => (
                                    <CivilStatusCombobox
                                        {...field}
                                        disabled={isDisabled(field.name)}
                                        id={field.name}
                                        placeholder="Civil Status"
                                    />
                                )}
                            />
                            <FormFieldWrapper
                                control={form.control}
                                label="Gender *"
                                name="member_gender"
                                render={({ field }) => (
                                    <MemberGenderCombobox
                                        {...field}
                                        disabled={isDisabled(field.name)}
                                        placeholder="Select Gender"
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
                                    <InputDate
                                        {...field}
                                        value={field.value ?? ''}
                                    />
                                )}
                            />
                            <FormFieldWrapper
                                control={form.control}
                                label="Contact Number"
                                name="contact_number"
                                render={({
                                    field,
                                    fieldState: { invalid, error },
                                }) => (
                                    <div className="relative flex flex-1 items-center gap-x-2">
                                        <VerifiedPatchIcon
                                            className={cn(
                                                'absolute right-2 top-1/2 z-20 size-4 -translate-y-1/2 text-primary delay-300 duration-300 ease-in-out',
                                                (invalid || error) &&
                                                    'text-destructive'
                                            )}
                                        />
                                        <PhoneInput
                                            {...field}
                                            className="w-full"
                                            defaultCountry="PH"
                                        />
                                    </div>
                                )}
                            />
                            <FormFieldWrapper
                                className="col-span-2"
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
                                        undefinable={true}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex gap-x-2 items-center">
                                <UserIcon />
                                <p className="font-medium">
                                    Membership Information
                                </p>
                            </div>
                            <Separator />
                        </div>

                        <FormFieldWrapper
                            className="col-span-1"
                            control={form.control}
                            label="Old Passbook (optional)"
                            name="old_reference_id"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    autoComplete="off"
                                    disabled={isDisabled(field.name)}
                                    id={field.name}
                                    placeholder="Old Passbook/Old Reference ID"
                                />
                            )}
                        />
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex gap-x-2 items-center">
                                <KeySharpIcon />
                                <p className="font-medium">
                                    Account Credential
                                </p>
                            </div>
                            <Separator />
                        </div>
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
                            name="accept_terms"
                            render={({ field }) => (
                                <FormItem className="col-span-3">
                                    <Label
                                        className="flex items-start gap-2 rounded-lg border p-3 has-data-checked:bg-accent/50 has-data-checked:border-primary/45 hover:bg-accent/50 cursor-pointer"
                                        htmlFor={field.name}
                                    >
                                        <Checkbox
                                            checked={field.value}
                                            disabled={
                                                formProps.readOnly ||
                                                isDisabled(field.name)
                                            }
                                            id={field.name}
                                            onCheckedChange={field.onChange}
                                        />
                                        <div className="flex flex-col gap-1">
                                            <p className="text-xs text-muted-foreground">
                                                I agree to Lands Coop -{' '}
                                                <Link
                                                    className="underline underline-offset-4 text-primary/70"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    } // prevent toggle
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                    to={
                                                        '/policy/terms-and-condition' as string
                                                    }
                                                >
                                                    terms and condition
                                                </Link>
                                                ,{' '}
                                                <Link
                                                    className="underline underline-offset-4 text-primary/70"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    } // prevent toggle
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                    to={
                                                        '/policy/privacy-policy' as string
                                                    }
                                                >
                                                    privacy policy and data
                                                    privacy.
                                                </Link>
                                            </p>
                                        </div>
                                    </Label>
                                </FormItem>
                            )}
                        />
                    </div>
                </fieldset>

                <FormFooterResetSubmit
                    disableSubmit={!form.formState.isDirty}
                    error={error}
                    isLoading={isPending}
                    onReset={() => {
                        form.reset()
                        reset()
                    }}
                    readOnly={formProps.readOnly}
                    submitText="Register"
                />
            </form>
        </Form>
    )
}

export default JoinForm
