import { useCallback } from 'react'

import type { UseFormReturn} from 'react-hook-form';
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import { MemberAddressSchema } from '@e-coop-monorepo/modules/member-address'
import type { IMemberAddressRequest } from '@e-coop-monorepo/modules/member-profile'
import { CountryCombobox } from '@e-coop-monorepo/modules/member-profile/components/comboboxes/country-combobox'
import { serverRequestErrExtractor } from '@e-coop-monorepo/shared/helpers'
import { useFormHelper } from '@e-coop-monorepo/shared/hooks'
import { useModalState } from '@e-coop-monorepo/shared/hooks'
import { cn } from '@e-coop-monorepo/shared/tw-utils'
import type { IClassProps, IForm } from '@e-coop-monorepo/shared/types'
import FormFooterResetSubmit from '@e-coop-monorepo/ui/core'
import type { MapLocation } from '@e-coop-monorepo/ui/core';
import MapView from '@e-coop-monorepo/ui/core'
import type { IModalProps } from '@e-coop-monorepo/ui/core';
import Modal from '@e-coop-monorepo/ui/core'
import { Button } from '@e-coop-monorepo/ui/core'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@e-coop-monorepo/ui/core'
import { Form } from '@e-coop-monorepo/ui/core'
import FormFieldWrapper from '@e-coop-monorepo/ui/core'
import { Input } from '@e-coop-monorepo/ui/core'
import { Switch } from '@e-coop-monorepo/ui/core'
import { Textarea } from '@e-coop-monorepo/ui/core'
import { MapPin, MoreVertical, Pencil, Plus, Star, Trash2 } from 'lucide-react'

import { useKYCVerifyAddresses } from '../..'
import type { IKYCVerifyAddressesRequest } from '../../kyc.types'

interface VerifyAddressesSectionProps {
    form: UseFormReturn<IKYCVerifyAddressesRequest>
    onNext: () => void
    onBack: () => void
}

export const VerifyAddressesSection = ({
    form,
    onNext,
}: VerifyAddressesSectionProps) => {
    const { watch } = form
    const addresses = watch('addresses') || []
    const addAddressState = useModalState()

    const KYCVerifyAddressMutation = useKYCVerifyAddresses()

    const handleSubmitAddress = async () => {
        const success = await form.trigger()
        if (success) {
            toast.promise(
                KYCVerifyAddressMutation.mutateAsync(
                    form.getValues().addresses
                ),
                {
                    loading: 'Checking...',
                    success: () => {
                        onNext()
                        return 'Address details checked'
                    },
                    error: (error) => serverRequestErrExtractor({ error }),
                }
            )
        }
    }

    const { remove, append } = useFieldArray({
        control: form.control,
        name: 'addresses',
    })

    const handleDelete = (index: number) => {
        remove(index)
    }

    const sortedAddresses = [...addresses].sort(
        (a, b) => (a.is_primary ? -1 : 1) - (b.is_primary ? -1 : 1)
    )

    return (
        <section className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                    Your Addresses
                </h2>
                {addresses.length === 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                        Add at least one address to continue
                    </p>
                )}
            </div>

            {addresses.length === 0 ? (
                <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed border-border">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-medium text-foreground mb-1">
                        No addresses yet
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Add your first address to continue
                    </p>
                    <Button
                        onClick={() => addAddressState.onOpenChange(true)}
                        size="sm"
                    >
                        <Plus className="size-4 mr-1" /> Add Address
                    </Button>
                </div>
            ) : (
                <div className="space-y-3">
                    {sortedAddresses.map((address, index) => (
                        <AddressItem
                            address={address}
                            form={form}
                            handleRemove={handleDelete}
                            index={index}
                            key={index}
                        />
                    ))}

                    <Button
                        className="w-full border-dashed"
                        onClick={() => addAddressState.onOpenChange(true)}
                        variant="outline"
                    >
                        <Plus className="size-4 mr-1" /> Add Another Address
                    </Button>
                </div>
            )}

            <div className="flex gap-3 pt-4">
                <Button
                    className="flex-1"
                    disabled={addresses.length === 0}
                    onClick={handleSubmitAddress}
                >
                    Continue
                </Button>
            </div>

            <AddressCreateUpdateModal
                {...addAddressState}
                formProps={{
                    onSuccess(data) {
                        append(data)
                    },
                }}
            />
        </section>
    )
}

const AddressItem = ({
    form,
    index,
    address,
    handleRemove,
}: {
    index: number
    address: Omit<IMemberAddressRequest, 'id'>
    form: UseFormReturn<IKYCVerifyAddressesRequest>
    handleRemove: (index: number) => void
}) => {
    const editState = useModalState()

    return (
        <div
            className={cn(
                'p-4 rounded-xl border transition-all',
                address.is_primary
                    ? 'bg-primary/5 border-primary/20'
                    : 'bg-card border-border'
            )}
            key={index}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">
                            {address.label}
                        </span>
                        {address.is_primary && (
                            <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                <Star className="w-3 h-3 fill-current" />{' '}
                                Primary
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {address.address}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        {address.barangay}, {address.city},{' '}
                        {address.province_state} {address.postal_code}
                    </p>
                </div>

                <AddressCreateUpdateModal
                    {...editState}
                    formProps={{
                        defaultValues: address,
                        onSuccess(data) {
                            form.setValue(`addresses.${index}`, data)
                        },
                    }}
                />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                            <MoreVertical className="size-4 text-muted-foreground" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => editState.onOpenChange(true)}
                        >
                            <Pencil className="size-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleRemove(index)}
                        >
                            <Trash2 className="size-4 mr-2" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export interface IAddressFormProps
    extends
        IClassProps,
        IForm<
            Partial<IMemberAddressRequest>,
            IMemberAddressRequest,
            Error,
            IMemberAddressRequest
        > {
    address?: IMemberAddressRequest
    readOnly?: boolean
}

export const AddressCreateUpdateForm = ({
    className,
    address,
    onSuccess,
    readOnly,
    ...formProps
}: IAddressFormProps) => {
    const form = useForm<IMemberAddressRequest>({
        resolver: standardSchemaResolver(MemberAddressSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            label: '',
            address: '',
            city: '',
            postal_code: '',
            province_state: '',
            barangay: '',
            landmark: '',
            country_code: 'PH',
            latitude: 0,
            longitude: 0,
            is_primary: false,
            ...address,
            ...formProps.defaultValues,
        },
    })

    const { formRef, isDisabled } = useFormHelper<IMemberAddressRequest>({
        form,
        readOnly,
        autoSave: false,
    })

    const onSubmit = form.handleSubmit((formData, e) => {
        e?.preventDefault()
        e?.stopPropagation()
        onSuccess?.(formData)
        form.reset()
    })

    const lat = form.watch('latitude')
    const lng = form.watch('longitude')

    const selectedLocation: MapLocation | null =
        lat && lng ? { lat, lng } : null

    const handleMapClick = useCallback(
        (e: google.maps.MapMouseEvent) => {
            if (!e.latLng) return

            form.setValue('latitude', e.latLng.lat(), {
                shouldDirty: true,
            })
            form.setValue('longitude', e.latLng.lng(), {
                shouldDirty: true,
            })
        },
        [form]
    )

    const handleUseMyLocation = useCallback(() => {
        if (!navigator.geolocation) {
            toast.error('Geolocation is not supported by your browser')
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                form.setValue('latitude', position.coords.latitude, {
                    shouldDirty: true,
                })
                form.setValue('longitude', position.coords.longitude, {
                    shouldDirty: true,
                })
            },
            () => {
                toast.error('Unable to retrieve your location')
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
            }
        )
    }, [form])

    return (
        <Form {...form}>
            <form
                className={cn(
                    'flex w-full max-w-full min-w-0 flex-col gap-y-4',
                    className
                )}
                onSubmit={onSubmit}
                ref={formRef}
            >
                <fieldset className="space-y-4" disabled={readOnly}>
                    <FormFieldWrapper
                        control={form.control}
                        label="Label *"
                        name="label"
                        render={({ field }) => (
                            <Input
                                {...field}
                                disabled={isDisabled(field.name)}
                                placeholder="Home, Office, etc."
                            />
                        )}
                    />

                    <FormFieldWrapper
                        control={form.control}
                        label="Full Address *"
                        name="address"
                        render={({ field }) => (
                            <Textarea
                                {...field}
                                disabled={isDisabled(field.name)}
                                placeholder="Street, building, unit..."
                                rows={2}
                            />
                        )}
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <FormFieldWrapper
                            control={form.control}
                            label="Barangay"
                            name="barangay"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    disabled={isDisabled(field.name)}
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
                                />
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <FormFieldWrapper
                            control={form.control}
                            label="Province/State"
                            name="province_state"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    disabled={isDisabled(field.name)}
                                />
                            )}
                        />
                        <FormFieldWrapper
                            control={form.control}
                            label="Postal Code"
                            name="postal_code"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    disabled={isDisabled(field.name)}
                                />
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <FormFieldWrapper
                            control={form.control}
                            label="Country Code"
                            name="country_code"
                            render={({ field }) => (
                                <CountryCombobox
                                    {...field}
                                    defaultValue={field.value}
                                    disabled={isDisabled(field.name)}
                                    onChange={(country) =>
                                        field.onChange(country.alpha3)
                                    }
                                    undefinable={false}
                                />
                            )}
                        />
                        <FormFieldWrapper
                            control={form.control}
                            label="Landmark"
                            name="landmark"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    disabled={isDisabled(field.name)}
                                />
                            )}
                        />
                    </div>

                    {/* MAP + GPS */}
                    <div className="w-full space-y-2">
                        <Button
                            onClick={handleUseMyLocation}
                            size="sm"
                            type="button"
                            variant="outline"
                        >
                            Use My Current Location
                        </Button>

                        <div className="h-[300px] rounded-lg overflow-hidden border">
                            <MapView
                                center={
                                    selectedLocation ?? {
                                        lat: 14.780043,
                                        lng: 121.046351,
                                    }
                                }
                                locations={
                                    selectedLocation ? [selectedLocation] : []
                                }
                                onClick={handleMapClick}
                                options={{
                                    mapId: '7315fed6ff6d5145e4c926ff',
                                    disableDefaultUI: true,
                                    zoomControl: true,
                                    streetViewControl: false,
                                    mapTypeControl: false,
                                    fullscreenControl: false,
                                    clickableIcons: false,
                                    gestureHandling: 'greedy',
                                }}
                                zoom={selectedLocation ? 16 : 12}
                            />
                        </div>

                        <p className="text-xs text-muted-foreground">
                            Click on the map or use GPS to set the exact
                            location.
                        </p>
                    </div>

                    <FormFieldWrapper
                        control={form.control}
                        name="is_primary"
                        render={({ field }) => (
                            <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg">
                                <div>
                                    <label
                                        className="text-sm font-medium"
                                        htmlFor="is_primary"
                                    >
                                        Set as Primary
                                    </label>
                                    <p className="text-xs text-muted-foreground">
                                        Default delivery address
                                    </p>
                                </div>
                                <Switch
                                    checked={field.value}
                                    disabled={isDisabled('is_primary')}
                                    id="is_primary"
                                    onCheckedChange={(val) =>
                                        field.onChange(val)
                                    }
                                />
                            </div>
                        )}
                    />
                </fieldset>

                <FormFooterResetSubmit
                    disableSubmit={!form.formState.isDirty}
                    onReset={() => form.reset()}
                    onSubmit={onSubmit}
                    readOnly={readOnly}
                    resetButtonClassName="w-fit"
                    submitButtonClassName="w-fit"
                    submitText="Save"
                />
            </form>
        </Form>
    )
}

export const AddressCreateUpdateModal = ({
    title = 'Add Address',
    description = 'Add a new address entry.',
    className,
    formProps,
    ...props
}: IModalProps & { formProps?: IAddressFormProps }) => {
    return (
        <Modal
            className={cn('!max-w-xl', className)}
            description={description}
            title={title}
            {...props}
        >
            <AddressCreateUpdateForm
                {...formProps}
                onSuccess={(data) => {
                    formProps?.onSuccess?.(data)
                    props.onOpenChange?.(false)
                }}
            />
        </Modal>
    )
}

export default VerifyAddressesSection
