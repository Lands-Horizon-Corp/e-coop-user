import { useEffect } from 'react'

import type { UseFormReturn} from 'react-hook-form';
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import type { IMedia } from '@e-coop-monorepo/modules/media'
import type {
    TMemberGovernmentBenefitSchema} from '@e-coop-monorepo/modules/member-government-benefit';
import {
    MemberGovernmentBenefitSchema,
    useGetAllGovernmentIds,
} from '@e-coop-monorepo/modules/member-government-benefit'
import GovernmentIdCombobox from '@e-coop-monorepo/modules/member-government-benefit/components/government-id-combobox'
import type { IGovernmentId } from '@e-coop-monorepo/modules/member-profile'
import { CountryCombobox } from '@e-coop-monorepo/modules/member-profile/components/comboboxes/country-combobox'
import { toReadableDate } from '@e-coop-monorepo/shared/helpers'
import { serverRequestErrExtractor } from '@e-coop-monorepo/shared/helpers'
// import TextEditor from '@e-coop-monorepo/ui/core'

import { useFormHelper } from '@e-coop-monorepo/shared/hooks'
import { useModalState } from '@e-coop-monorepo/shared/hooks'
import { cn } from '@e-coop-monorepo/shared/tw-utils'
import type { IClassProps, IForm } from '@e-coop-monorepo/shared/types'
import FormFooterResetSubmit from '@e-coop-monorepo/ui/core'
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
import ImageField from '@e-coop-monorepo/ui/core'
import { Input } from '@e-coop-monorepo/ui/core'
import InputDate from '@e-coop-monorepo/ui/core'
import { CreditCard, MoreVertical, Pencil, Plus, Trash2 } from 'lucide-react'

import type {
    IKYCVerifyGovernmentBenefitsRequest} from '../..';
import {
    useKYCVerifyGovernmentBenefits,
} from '../..'
import type { TKYCVerifyGovernmentBenefitsSchema } from '../../kyc.validation'

interface VerifyGovernmentBenefitsSectionProps {
    form: UseFormReturn<TKYCVerifyGovernmentBenefitsSchema>
    onNext: () => void
    onBack: () => void
}

export const VerifyGovernmentBenefitsSection = ({
    form,
    onNext,
}: VerifyGovernmentBenefitsSectionProps) => {
    const { watch } = form
    const benefits = watch('government_benefits') || []
    const addState = useModalState()

    const verifyMutation = useKYCVerifyGovernmentBenefits()

    const { append, remove } = useFieldArray({
        control: form.control,
        name: 'government_benefits',
    })

    const handleSubmit = async () => {
        const success = await form.trigger()
        if (success) {
            toast.promise(
                verifyMutation.mutateAsync(
                    form.getValues('government_benefits')
                ),
                {
                    loading: 'Checking...',
                    success: () => {
                        onNext()
                        return 'Government benefits verified'
                    },
                    error: (error) => serverRequestErrExtractor({ error }),
                }
            )
        }
    }

    return (
        <section className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                    Government Benefits
                </h2>
                {benefits.length === 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                        Add at least one government ID to continue
                    </p>
                )}
            </div>

            {benefits.length === 0 ? (
                <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed border-border">
                    <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-medium text-foreground mb-1">
                        No government benefits yet
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Add your first government ID
                    </p>
                    <Button
                        onClick={() => addState.onOpenChange(true)}
                        size="sm"
                    >
                        <Plus className="size-4 mr-1" /> Add Government ID
                    </Button>
                </div>
            ) : (
                <div className="space-y-3">
                    {benefits.map((benefit, index) => (
                        <GovernmentBenefitItem
                            benefit={benefit}
                            form={form}
                            index={index}
                            key={index}
                            onRemove={remove}
                        />
                    ))}

                    <Button
                        className="w-full border-dashed"
                        onClick={() => addState.onOpenChange(true)}
                        variant="outline"
                    >
                        <Plus className="size-4 mr-1" /> Add Another ID
                    </Button>
                </div>
            )}

            <div className="flex gap-3 pt-4">
                <Button
                    className="flex-1"
                    disabled={benefits.length === 0}
                    onClick={handleSubmit}
                >
                    Continue
                </Button>
            </div>

            <GovernmentBenefitCreateUpdateModal
                {...addState}
                formProps={{
                    onSuccess(data) {
                        append(data)
                    },
                }}
            />
        </section>
    )
}

const GovernmentBenefitItem = ({
    benefit,
    index,
    form,
    onRemove,
}: {
    index: number
    benefit: TMemberGovernmentBenefitSchema
    form: UseFormReturn<IKYCVerifyGovernmentBenefitsRequest>
    onRemove: (index: number) => void
}) => {
    const editState = useModalState()

    return (
        <div className="p-4 rounded-xl border bg-card border-border">
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground">
                        {benefit.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        {benefit.value}
                    </p>
                    {benefit.expiry_date && (
                        <p className="text-xs text-muted-foreground mt-1">
                            Expiration: {toReadableDate(benefit.expiry_date)}
                        </p>
                    )}
                </div>

                <GovernmentBenefitCreateUpdateModal
                    {...editState}
                    formProps={{
                        defaultValues: benefit,
                        onSuccess(data) {
                            form.setValue(`government_benefits.${index}`, data)
                        },
                    }}
                />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-accent rounded-lg">
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
                            onClick={() => onRemove(index)}
                        >
                            <Trash2 className="size-4 mr-2" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export interface IGovernmentBenefitFormProps
    extends
        IClassProps,
        IForm<
            Partial<TMemberGovernmentBenefitSchema>,
            TMemberGovernmentBenefitSchema,
            Error,
            TMemberGovernmentBenefitSchema
        > {
    readOnly?: boolean
}

export const GovernmentBenefitCreateUpdateForm = ({
    className,
    onSuccess,
    readOnly,
    ...formProps
}: IGovernmentBenefitFormProps) => {
    const form = useForm<TMemberGovernmentBenefitSchema>({
        resolver: standardSchemaResolver(MemberGovernmentBenefitSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            name: 'unknown',
            value: '',
            country_code: 'PHL',
            description: '',
            ...formProps.defaultValues,
        },
    })

    const { formRef, isDisabled } =
        useFormHelper<TMemberGovernmentBenefitSchema>({
            form,
            readOnly,
            autoSave: false,
        })

    const onSubmit = form.handleSubmit((data, e) => {
        e?.preventDefault()
        e?.stopPropagation()

        onSuccess?.(data)
        form.reset()
    })

    const name = form.watch('name')
    const isoAlpha3 = form.watch('country_code')
    const government: IGovernmentId | undefined = form.watch('government')

    const { data } = useGetAllGovernmentIds({
        isoAlpha3,
        options: {
            enabled: !!isoAlpha3,
        },
    })

    useEffect(() => {
        if (government || !name || name.length === 0 || data?.length === 0)
            return

        const matchedGovernment = data?.find((gov) => gov.name === name)

        if (matchedGovernment) {
            form.setValue('government', matchedGovernment)
        }
    }, [data, form, government, name])

    return (
        <Form {...form}>
            <form
                className={cn('flex flex-col gap-y-4', className)}
                onSubmit={onSubmit}
                ref={formRef}
            >
                <fieldset className="space-y-3 max-w-full min-w-0">
                    <div className="grid w-full grid-cols-1 min-w-0 max-w-full gap-4 sm:grid-cols-8">
                        <FormFieldWrapper
                            className="col-span-full"
                            control={form.control}
                            label="Country *"
                            name="country_code"
                            render={({ field }) => (
                                <CountryCombobox
                                    {...field}
                                    defaultValue={field.value}
                                    disabled={isDisabled(field.name)}
                                    onChange={(country) => {
                                        field.onChange(country.alpha3)
                                    }}
                                    placeholder="Country"
                                    undefinable={false}
                                />
                            )}
                        />
                        <FormFieldWrapper
                            className="col-span-full"
                            control={form.control}
                            label="Name *"
                            name="name"
                            render={({ field }) => (
                                <GovernmentIdCombobox
                                    disabled={!isoAlpha3}
                                    isoAlpha3={isoAlpha3}
                                    {...field}
                                    onChange={(governmentId) => {
                                        form.setValue(
                                            'name',
                                            governmentId?.name ?? ''
                                        )
                                        form.setValue(
                                            'government',
                                            governmentId
                                        )
                                    }}
                                />
                            )}
                        />
                        <FormFieldWrapper
                            className="sm:col-span-4"
                            control={form.control}
                            label={
                                government?.field_name
                                    ? government.field_name
                                    : 'Value *'
                            }
                            name="value"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    disabled={isDisabled(field.name)}
                                    id={field.name}
                                    placeholder="Value or ID No"
                                />
                            )}
                        />
                        <FormFieldWrapper
                            className="relative sm:col-span-4"
                            control={form.control}
                            description="mm/dd/yyyy"
                            descriptionClassName="absolute top-0 right-0"
                            label="Expiry Date *"
                            name="expiry_date"
                            render={({ field }) => (
                                <InputDate
                                    {...field}
                                    className="block"
                                    disabled={isDisabled(field.name)}
                                    placeholder="Expiry Date"
                                    value={field.value ?? ''}
                                />
                            )}
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormFieldWrapper
                            control={form.control}
                            label="Front ID Photo *"
                            name="front_media_id"
                            render={({ field }) => {
                                const value = form.watch('front_media')

                                return (
                                    <ImageField
                                        {...field}
                                        onChange={(newImage) => {
                                            if (newImage)
                                                field.onChange(newImage.id)
                                            else field.onChange(undefined)

                                            form.setValue(
                                                'front_media',
                                                newImage
                                            )
                                        }}
                                        placeholder="Upload ID Front Photo"
                                        value={
                                            value
                                                ? (value as IMedia).download_url
                                                : value
                                        }
                                    />
                                )
                            }}
                        />
                        <FormFieldWrapper
                            control={form.control}
                            label="Back ID Photo *"
                            name="back_media_id"
                            render={({ field }) => {
                                const value = form.watch('back_media')

                                return (
                                    <ImageField
                                        {...field}
                                        onChange={(newImage) => {
                                            if (newImage)
                                                field.onChange(newImage.id)
                                            else field.onChange(undefined)

                                            form.setValue(
                                                'back_media',
                                                newImage
                                            )
                                        }}
                                        placeholder="Upload ID Back Photo"
                                        value={
                                            value
                                                ? (value as IMedia).download_url
                                                : value
                                        }
                                    />
                                )
                            }}
                        />
                    </div>
                    {/* <FormFieldWrapper
                        control={form.control}
                        label="Description"
                        name="description"
                        render={({ field }) => (
                            <TextEditor
                                {...field}
                                content={field.value}
                                disabled={isDisabled(field.name)}
                                placeholder="Description..."
                                textEditorClassName="!max-w-none bg-background"
                            />
                        )}
                    /> */}
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

export const GovernmentBenefitCreateUpdateModal = ({
    title = 'Add Government ID',
    description = 'Add government identification details.',
    className,
    formProps,
    ...props
}: IModalProps & { formProps?: IGovernmentBenefitFormProps }) => {
    return (
        <Modal
            {...props}
            className={cn('!max-w-xl', className)}
            description={description}
            title={title}
        >
            <GovernmentBenefitCreateUpdateForm
                {...formProps}
                onSuccess={(data) => {
                    formProps?.onSuccess?.(data)
                    props.onOpenChange?.(false)
                }}
            />
        </Modal>
    )
}

export default VerifyGovernmentBenefitsSection
