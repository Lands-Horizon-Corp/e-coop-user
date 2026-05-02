import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import { useFormHelper } from '@ecoop/shared/hooks'
import { cn } from '@ecoop/shared/tw-utils'
import type { IClassProps, IForm, TEntityId } from '@ecoop/shared/types'
import FormFooterResetSubmit from '@ecoop/ui/core'
import MapPicker from '@ecoop/ui/core'
import type { IModalProps } from '@ecoop/ui/core'
import Modal from '@ecoop/ui/core'
import { Form } from '@ecoop/ui/core'
import FormFieldWrapper from '@ecoop/ui/core'
import { Input } from '@ecoop/ui/core'
import { Textarea } from '@ecoop/ui/core'

import type { IMemberAddressRequest } from '../../member-profile.types'
import { MemberAddressSchema } from '../../member-profile.validation'
import { CountryCombobox } from '../comboboxes/country-combobox'

type TMemberAddressFormValues = IMemberAddressRequest

export interface IMemberAddressFormProps
    extends
        IClassProps,
        IForm<
            Partial<IMemberAddressRequest>,
            IMemberAddressRequest,
            Error,
            TMemberAddressFormValues
        > {
    memberProfileId: TEntityId
    memberAddressId?: TEntityId
}

const MemberAddressCreateUpdateForm = ({
    memberAddressId,
    className,
    ...formProps
}: IMemberAddressFormProps) => {
    const form = useForm<TMemberAddressFormValues>({
        resolver: standardSchemaResolver(MemberAddressSchema),
        reValidateMode: 'onChange',
        mode: 'onSubmit',
        defaultValues: {
            label: '',
            city: '',
            country_code: '',
            postal_code: '',
            province_state: '',
            barangay: '',
            landmark: '',
            address: '',
            longitude: 121.046351,
            latitude: 14.780043,
            ...formProps.defaultValues,
        },
    })

    // Commented out - real mutations removed for mock mode
    // const createMutation = useCreateMemberProfileAddress({ ... })
    // const updateMutation = useUpdateMemberProfileAddress({ ... })

    const { formRef, handleFocusError, isDisabled } =
        useFormHelper<TMemberAddressFormValues>({
            form,
            ...formProps,
        })

    // Mock onSubmit — show toast and call parent onSuccess
    const onSubmit = form.handleSubmit((formData) => {
        if (memberAddressId) {
            toast.success('Address updated (mock).')
        } else {
            toast.success('Address created (mock).')
        }

        // notify parent and close modal if parent provided handler via modal wrapper
        formProps?.onSuccess?.(formData)
    }, handleFocusError)

    // Mock status/error/reset (no real mutations)
    const error = undefined
    const isPending = false
    const reset = () => form.reset()

    const countryCode = form.watch('country_code')

    // optional: keep any effects you had originally (no network calls here)
    useEffect(() => {
        // placeholder if you want to run logic when country changes
    }, [countryCode])

    return (
        <Form {...form}>
            <form
                className={cn('flex w-full flex-col gap-y-4', className)}
                onSubmit={onSubmit}
                ref={formRef}
            >
                <fieldset
                    className="grid gap-x-6 gap-y-4 sm:gap-y-3"
                    disabled={isPending || formProps.readOnly}
                >
                    <fieldset className="space-y-3">
                        <FormFieldWrapper
                            control={form.control}
                            label="Label *"
                            name="label"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    disabled={isDisabled(field.name)}
                                    id={field.name}
                                    placeholder="Label"
                                />
                            )}
                        />
                        <FormFieldWrapper
                            control={form.control}
                            label="Country Code *"
                            name="country_code"
                            render={({ field }) => (
                                <CountryCombobox
                                    {...field}
                                    defaultValue={field.value}
                                    disabled={isDisabled(field.name)}
                                    onChange={(country) =>
                                        field.onChange(country.alpha2)
                                    }
                                    undefinable={false}
                                />
                            )}
                        />
                        <FormFieldWrapper
                            control={form.control}
                            label="Address *"
                            name="address"
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    disabled={isDisabled(field.name)}
                                    id={field.name}
                                    placeholder="Type complete address here"
                                />
                            )}
                        />
                        <FormFieldWrapper
                            control={form.control}
                            label="City"
                            name="city"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    disabled={isDisabled(field.name)}
                                    id={field.name}
                                    placeholder="City"
                                />
                            )}
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <FormFieldWrapper
                                control={form.control}
                                label="Postal Code"
                                name="postal_code"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        disabled={isDisabled(field.name)}
                                        id={field.name}
                                        placeholder="Postal Code"
                                    />
                                )}
                            />
                            <FormFieldWrapper
                                control={form.control}
                                label="Province / State"
                                name="province_state"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        disabled={isDisabled(field.name)}
                                        id={field.name}
                                        placeholder="Province/State"
                                    />
                                )}
                            />
                        </div>
                        {countryCode === 'PH' && (
                            <FormFieldWrapper
                                control={form.control}
                                label="Barangay"
                                name="barangay"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        disabled={isDisabled(field.name)}
                                        id={field.name}
                                        placeholder="Barangay"
                                    />
                                )}
                            />
                        )}
                        <FormFieldWrapper
                            control={form.control}
                            label="Landmark"
                            name="landmark"
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    disabled={isDisabled(field.name)}
                                    id={field.name}
                                    placeholder="Landmark"
                                />
                            )}
                        />
                        <MapPicker
                            className="w-full"
                            disabled={isPending || formProps.readOnly}
                            onChange={(location) => {
                                if (location) {
                                    form.setValue('latitude', location.lat, {
                                        shouldDirty: true,
                                    })
                                    form.setValue('longitude', location.lng, {
                                        shouldDirty: true,
                                    })
                                } else {
                                    form.setValue('latitude', 0, {
                                        shouldDirty: true,
                                    })
                                    form.setValue('longitude', 0, {
                                        shouldDirty: true,
                                    })
                                }
                            }}
                            placeholder="Choose/Select exact location on map"
                            title="Pinpoint Address Location"
                            value={{
                                lat: form.watch('latitude') || 14.780043,
                                lng: form.watch('longitude') || 121.046351,
                            }}
                            variant="outline"
                        />
                    </fieldset>
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
                    submitText={memberAddressId ? 'Update' : 'Create'}
                />
            </form>
        </Form>
    )
}

export const MemberAddressCreateUpdateFormModal = ({
    title = 'Create Address',
    description = 'Fill out the form to add or update address.',
    className,
    formProps,
    ...props
}: IModalProps & {
    formProps: Omit<IMemberAddressFormProps, 'className'>
}) => {
    return (
        <Modal
            className={cn('', className)}
            description={description}
            title={title}
            {...props}
        >
            <MemberAddressCreateUpdateForm
                {...formProps}
                onSuccess={(createdData) => {
                    // show toast and close modal
                    toast.success(
                        `Address ${formProps?.memberAddressId ? 'updated' : 'created'} (mock).`
                    )
                    formProps?.onSuccess?.(createdData)
                    props.onOpenChange?.(false)
                }}
            />
        </Modal>
    )
}

export default MemberAddressCreateUpdateForm
