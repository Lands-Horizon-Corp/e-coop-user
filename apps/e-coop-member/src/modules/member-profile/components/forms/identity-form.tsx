import { UseFormReturn, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import { cn } from '@/helpers'
import { toInputDateString } from '@/helpers/date-utils'
import { serverRequestErrExtractor } from '@/helpers/error-message-extractor'
import CivilStatusCombobox from '@/modules/member-profile/components/comboboxes/civil-status-combobox'
import { CountryCombobox } from '@/modules/member-profile/components/comboboxes/country-combobox'
import MemberGenderCombobox from '@/modules/member-profile/components/comboboxes/member-gender-combobox'

import FormFooterResetSubmit from '@/components/form-components/form-footer-reset-submit'
import { CameraFillIcon, FilesIcon, UserIcon } from '@/components/icons'
import ImageDisplay from '@/components/image-display'
import SignatureField from '@/components/signature/signature-field'
import SingleImageUploaderModal from '@/components/single-image-uploader/single-image-uploader-modal'
import ActionTooltip from '@/components/tooltips/action-tooltip'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import FormFieldWrapper from '@/components/ui/form-field-wrapper'
import ImageField from '@/components/ui/image-field'
// import ImageField from '@/components/ui/image-field'
import { Input } from '@/components/ui/input'
import InputDate from '@/components/ui/input-date'
import { Textarea } from '@/components/ui/textarea'

import { useFormHelper } from '@/hooks/use-form-helper'
import { useModalState } from '@/hooks/use-modal-state'

import { IClassProps, IForm, TEntityId } from '@/types'

import { useUpdateMemberProfileIdentity } from '../../member-profile.service'
import {
    IMemberProfile,
    IMemberpRofileIdentityRequest,
} from '../../member-profile.types'
import {
    MemberProfileIdentitySchema,
    TMemberProfileIdentitySchema,
} from '../../member-profile.validation'

// --- SERVICE / MUTATION HOOK (You will replace this with your actual hook)

export interface IIdentityFormProps
    extends
        IClassProps,
        IForm<Partial<IMemberpRofileIdentityRequest>, IMemberProfile> {
    memberId: TEntityId
}

/** -------------------------
 *  IDENTITY FORM COMPONENT
 *  -------------------------
 */
const IdentityForm = ({
    className,
    memberId,
    ...formProps
}: IIdentityFormProps) => {
    const form = useForm<TMemberProfileIdentitySchema>({
        resolver: standardSchemaResolver(MemberProfileIdentitySchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            birth_place: 'PHL',
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
    } = useUpdateMemberProfileIdentity({
        options: {
            onSuccess: formProps.onSuccess,
            onError: formProps.onError,
            meta: { invalidates: [['member-profile']] },
        },
    })

    const error = serverRequestErrExtractor({ error: rawError })

    const { formRef, handleFocusError, isDisabled } =
        useFormHelper<IMemberpRofileIdentityRequest>({
            form,
            ...formProps,
            autoSave: false,
            preventExitOnDirty: false,
        })

    const onSubmit = form.handleSubmit(async (formData) => {
        const promise = toast.promise(
            mutateAsync(
                { memberId, data: formData },
                {
                    onSuccess: (data) => form.reset(data),
                }
            ),
            {
                loading: 'Saving...',
                success: 'Profile Updated',
            }
        )

        return promise
    }, handleFocusError)

    return (
        <Form {...form}>
            <form
                className={cn('flex w-full flex-col space-y-6', className)}
                onSubmit={onSubmit}
                ref={formRef}
            >
                <fieldset
                    className="space-y-6"
                    disabled={isPending || formProps.readOnly}
                >
                    <div className="bg-card border border-border/70 dark:border-border/40 rounded-xl p-4 space-y-5">
                        <div className="flex gap-x-2 items-center">
                            <UserIcon />
                            <p className="font-medium">Photo & Signature</p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4">
                            <FormFieldWrapper
                                control={form.control}
                                label="Photo"
                                name="media_id"
                                render={({ field: _field }) => (
                                    // <AccountProfilePicture form={form} />
                                    <ImageField
                                        {..._field}
                                        onChange={(src) => {
                                            _field.onChange(src?.id)
                                            form.setValue('media', src)
                                        }}
                                        placeholder="Upload Photo"
                                        value={form.watch('media')}
                                    />
                                )}
                            />
                            <FormFieldWrapper
                                control={form.control}
                                label="Signature"
                                name="signature_media_id"
                                render={({ field }) => {
                                    return (
                                        <SignatureField
                                            {...field}
                                            onChange={(media) => {
                                                field.onChange(media?.id)
                                                form.setValue(
                                                    'signature_media',
                                                    media
                                                )
                                            }}
                                            placeholder="Signature"
                                            value={
                                                form.watch('signature_media')
                                                    ?.download_url
                                            }
                                        />
                                    )
                                }}
                            />
                        </div>
                    </div>

                    <div className="bg-card border border-border/70 dark:border-border/40 rounded-xl p-4 space-y-5">
                        <div className="flex gap-x-2 items-center">
                            <UserIcon />
                            <p className="font-medium">Personal Information</p>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-10">
                                <FormFieldWrapper
                                    className="col-span-3"
                                    control={form.control}
                                    label="First Name *"
                                    name="first_name"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            disabled={isDisabled(field.name)}
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
                                            disabled={isDisabled(field.name)}
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
                                            disabled={isDisabled(field.name)}
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
                                            disabled={isDisabled(field.name)}
                                            placeholder=""
                                        />
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <FormFieldWrapper
                                    control={form.control}
                                    label="Civil Status *"
                                    name="civil_status"
                                    render={({ field }) => (
                                        <CivilStatusCombobox
                                            {...field}
                                            disabled={isDisabled(field.name)}
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
                                        />
                                    )}
                                />
                                <FormFieldWrapper
                                    control={form.control}
                                    label={
                                        <>
                                            Birthdate *<span>mm/dd/yyyy</span>
                                        </>
                                    }
                                    labelClassName="justify-between inline-flex w-full"
                                    name="birthdate"
                                    render={({ field }) => (
                                        <InputDate
                                            {...field}
                                            value={field.value ?? ''}
                                        />
                                    )}
                                />
                                <FormFieldWrapper
                                    className="col-span-3"
                                    control={form.control}
                                    label="Birth Place (ISO Alpha-3)"
                                    name="birth_place"
                                    render={({ field }) => (
                                        <CountryCombobox
                                            {...field}
                                            defaultValue={field.value}
                                            onChange={(country) =>
                                                field.onChange(country?.alpha3)
                                            }
                                            undefinable
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-card border border-border/70 dark:border-border/40 rounded-xl p-4 space-y-5">
                        <div className="flex gap-x-2 items-center">
                            <UserIcon />
                            <p className="font-medium">Contact & Business</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormFieldWrapper
                                control={form.control}
                                label="Contact Number"
                                name="contact_number"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Contact Number"
                                    />
                                )}
                            />

                            <FormFieldWrapper
                                control={form.control}
                                label="Occupation"
                                name="member_occupation"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Occupation / Job Title"
                                    />
                                )}
                            />

                            <FormFieldWrapper
                                control={form.control}
                                label="Business Address"
                                name="business_address"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Business Address"
                                    />
                                )}
                            />

                            <FormFieldWrapper
                                control={form.control}
                                label="Business Contact Number"
                                name="business_contact_number"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Business Contact Number"
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="bg-card border border-border/70 dark:border-border/40 rounded-xl p-4 space-y-5">
                        <div className="flex gap-x-2 items-center">
                            <FilesIcon />
                            <p className="font-medium">Notes & Description</p>
                        </div>

                        <div className="gap-4 grid grid-cols-2">
                            <FormFieldWrapper
                                control={form.control}
                                label="Notes"
                                name="notes"
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        placeholder="Additional notes…"
                                    />
                                )}
                            />

                            <FormFieldWrapper
                                control={form.control}
                                label="Description"
                                name="description"
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        placeholder="Description"
                                    />
                                )}
                            />
                        </div>
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
                />
            </form>
        </Form>
    )
}

export const AccountProfilePictureFormField = ({
    form,
}: {
    form: UseFormReturn<IMemberpRofileIdentityRequest>
}) => {
    const modalState = useModalState(false)

    return (
        <div className={cn('relative size-44')}>
            <SingleImageUploaderModal
                {...modalState}
                singleImageUploadProps={{
                    defaultFileName: `user`,
                    onUploadComplete: (newMediaResource) => {
                        form.setValue('media', newMediaResource)
                        form.setValue('media_id', newMediaResource.id)
                        modalState.onOpenChange(false)
                    },
                }}
                title="Update Profile Image"
            />
            <ImageDisplay
                className="size-full rounded-full border-4 border-popover shadow-sm"
                fallback={form.getValues('first_name').charAt(0) ?? '-'}
                src={form.getValues('media')}
            />
            <ActionTooltip align="center" side="right" tooltipContent="Change">
                <Button
                    className="absolute bottom-2 right-2 size-fit rounded-full border border-transparent p-1 hover:border-foreground/20"
                    onClick={() => modalState.onOpenChange((prev) => !prev)}
                    type="button"
                    variant="secondary"
                >
                    <CameraFillIcon className="size-4 opacity-50 duration-300 ease-in-out group-hover:opacity-80" />
                </Button>
            </ActionTooltip>
        </div>
    )
}

export default IdentityForm
