import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import { cn } from '@e-coop-monorepo/shared/helpers'
import { useFormHelper } from '@e-coop-monorepo/shared/hooks'
import { IClassProps, IForm, TEntityId } from '@e-coop-monorepo/shared/types'
import FormFooterResetSubmit from '@e-coop-monorepo/ui/components/form-components/form-footer-reset-submit'
import Modal, { IModalProps } from '@e-coop-monorepo/ui/components/modals/modal'
import { Form } from '@e-coop-monorepo/ui/components/ui/form'
import FormFieldWrapper from '@e-coop-monorepo/ui/components/ui/form-field-wrapper'
import ImageField from '@e-coop-monorepo/ui/components/ui/image-field'
import { Input } from '@e-coop-monorepo/ui/components/ui/input'
import InputDate from '@e-coop-monorepo/ui/components/ui/input-date'
import TextEditor from '@e-coop-monorepo/ui/components/ui/text-editor'

import {
    IGovernmentId,
    IMemberGovernmentBenefitRequest,
} from '../../member-profile.types'
import {
    MemberGovernmentBenefitSchema,
    TMemberGovernmentBenefitSchema,
} from '../../member-profile.validation'
import { CountryCombobox } from '../comboboxes/country-combobox'
import GovernmentIdCombobox, {
    mockGovernmentIds,
} from '../comboboxes/government-id-combobox'

export interface IMemberGovernmentBenefitFormProps
    extends
        IClassProps,
        IForm<
            Partial<IMemberGovernmentBenefitRequest>,
            IMemberGovernmentBenefitRequest,
            Error,
            TMemberGovernmentBenefitSchema
        > {
    memberProfileId: TEntityId
    benefitId?: TEntityId
}

const MemberGovernmentBenefitCreateUpdateForm = ({
    className,
    benefitId,
    // memberProfileId,
    ...formProps
}: IMemberGovernmentBenefitFormProps) => {
    const form = useForm<TMemberGovernmentBenefitSchema>({
        resolver: standardSchemaResolver(MemberGovernmentBenefitSchema),
        reValidateMode: 'onChange',
        mode: 'onSubmit',
        defaultValues: {
            name: '',
            country_code: '',
            value: '',
            description: '',
            ...formProps.defaultValues,
        },
    })

    const { formRef, handleFocusError, isDisabled } =
        useFormHelper<TMemberGovernmentBenefitSchema>({
            form,
            ...formProps,
        })

    // Mock onSubmit: just show a toast
    const onSubmit = form.handleSubmit(() => {
        if (benefitId) {
            toast.success('Government Benefit updated successfully!')
        } else {
            toast.success('Government Benefit created successfully!')
        }
    }, handleFocusError)

    const error = undefined
    const isPending = false
    const reset = () => form.reset()

    const name = form.watch('name')
    const isoAlpha3 = form.watch('country_code')
    const government: IGovernmentId | undefined = form.watch('government')

    // Mock: data fetching can stay if you want, or skip
    const data = mockGovernmentIds

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
                className={cn(
                    'flex min-w-0 max-w-full flex-col gap-y-4',
                    className
                )}
                onSubmit={onSubmit}
                ref={formRef}
            >
                <fieldset
                    className="grid gap-x-6 min-w-0 max-w-full gap-y-4 sm:gap-y-3"
                    disabled={isPending || formProps.readOnly}
                >
                    <fieldset className="space-y-6 max-w-full min-w-0">
                        <div className="grid w-full min-w-0 max-w-full gap-4 sm:grid-cols-8">
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
                                        className="col-span-full"
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
                                className="col-span-4"
                                control={form.control}
                                label={
                                    government?.field_name
                                        ? government.name
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
                                className="relative col-span-4"
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

                        <div className="grid gap-4 bg-card/40 border border-border/40 rounded-xl p-4 sm:grid-cols-2">
                            <div className="col-span-full">
                                <p className="text-sm text-muted-foreground">
                                    Please provide Front & Back photo of your ID
                                </p>
                            </div>
                            <FormFieldWrapper
                                control={form.control}
                                label="Front ID Photo *"
                                name="front_media_url"
                                render={({ field }) => {
                                    return (
                                        <ImageField
                                            {...field}
                                            placeholder="Upload ID Front Photo"
                                            value={form.watch(
                                                'front_media_url'
                                            )}
                                        />
                                    )
                                }}
                            />
                            <FormFieldWrapper
                                control={form.control}
                                label="Back ID Photo *"
                                name="back_media_url"
                                render={({ field }) => {
                                    return (
                                        <ImageField
                                            {...field}
                                            placeholder="Upload ID Back Photo"
                                            value={form.watch('back_media_url')}
                                        />
                                    )
                                }}
                            />
                        </div>
                        <FormFieldWrapper
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
                        />
                    </fieldset>
                </fieldset>
                <FormFooterResetSubmit
                    disableSubmit={!form.formState.isDirty}
                    error={error}
                    isLoading={isPending}
                    onReset={() => reset()}
                    readOnly={formProps.readOnly}
                    submitText={benefitId ? 'Update' : 'Create'}
                />
            </form>
        </Form>
    )
}

export const MemberGovernmentBenefitCreateUpdateFormModal = ({
    title = 'Create Government Benefit',
    description = 'Fill out the form to add or update government benefit.',
    className,
    formProps,
    ...props
}: IModalProps & {
    formProps: Omit<IMemberGovernmentBenefitFormProps, 'className'>
}) => {
    return (
        <Modal
            className={cn('!max-w-2xl', className)}
            description={description}
            title={title}
            {...props}
        >
            <MemberGovernmentBenefitCreateUpdateForm
                {...formProps}
                onSuccess={() => {
                    toast.success(
                        `Government Benefit ${
                            formProps.benefitId ? 'updated' : 'created'
                        } successfully!`
                    )
                    props.onOpenChange?.(false)
                }}
            />
        </Modal>
    )
}

export default MemberGovernmentBenefitCreateUpdateForm
