import { useForm } from 'react-hook-form'
import z from 'zod'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import { CurrencyInput } from '@e-coop-monorepo/modules/currency'
import { toInputDateString } from '@e-coop-monorepo/shared/helpers'
import { cn } from '@e-coop-monorepo/shared/helpers/tw-utils'
import { useFormHelper } from '@e-coop-monorepo/shared/hooks'
import { IClassProps, IForm, TEntityId } from '@e-coop-monorepo/shared/types'
import FormFooterResetSubmit from '@e-coop-monorepo/ui'
import Modal, { IModalProps } from '@e-coop-monorepo/ui'
import { Form } from '@e-coop-monorepo/ui'
import FormFieldWrapper from '@e-coop-monorepo/ui'
import ImageField from '@e-coop-monorepo/ui'
import { Input } from '@e-coop-monorepo/ui'
import InputDate from '@e-coop-monorepo/ui'
import TextEditor from '@e-coop-monorepo/ui'

import {
    IMemberAssetRequest,
    MemberAssetSchema,
} from '../../member-profile.validation'

type TMemberAssetFormValues = z.infer<typeof MemberAssetSchema>

export interface IMemberAssetFormProps
    extends
        IClassProps,
        IForm<
            Partial<IMemberAssetRequest>,
            IMemberAssetRequest,
            Error,
            TMemberAssetFormValues
        > {
    memberProfileId: TEntityId
    assetId?: TEntityId
}

const MemberAssetCreateUpdateForm = ({
    memberProfileId,
    assetId,
    className,
    ...formProps
}: IMemberAssetFormProps) => {
    const form = useForm<TMemberAssetFormValues>({
        resolver: standardSchemaResolver(MemberAssetSchema),
        reValidateMode: 'onChange',
        mode: 'onSubmit',
        defaultValues: {
            name: '',
            member_profile_id: memberProfileId,
            ...formProps.defaultValues,
            entry_date: toInputDateString(
                formProps.defaultValues?.entry_date ?? new Date()
            ),
        },
    })

    // const createMutation = useCreateMemberProfileAsset({
    //     options: {
    //         ...withToastCallbacks({
    //             textSuccess: 'Created',
    //             onSuccess: formProps.onSuccess,
    //             onError: formProps.onError,
    //         }),
    //     },
    // })
    // const updateMutation = useUpdateMemberProfileAsset({
    //     options: {
    //         ...withToastCallbacks({
    //             textSuccess: 'Updated',
    //             onSuccess: formProps.onSuccess,
    //             onError: formProps.onError,
    //         }),
    //     },
    // })

    const { formRef, handleFocusError, isDisabled } =
        useFormHelper<TMemberAssetFormValues>({
            form,
            ...formProps,
        })

    const onSubmit = form.handleSubmit((formData) => {
        // Mock: Just log or toast
        if (assetId) {
            console.log('Update asset mock:', formData)
            // toast.success('Asset updated successfully!')
        } else {
            console.log('Create asset mock:', formData)
            // toast.success('Asset created successfully!')
        }
    }, handleFocusError)

    // const {
    //     error: rawError,
    //     isPending,
    //     reset,
    // } = assetId ? updateMutation : createMutation

    const error = undefined
    const isPending = false
    const reset = () => form.reset()

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
                            label="Asset Name *"
                            name="name"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    disabled={isDisabled(field.name)}
                                    id={field.name}
                                    placeholder="Asset Name"
                                />
                            )}
                        />
                        <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                            <FormFieldWrapper
                                control={form.control}
                                label="Asset Cost *"
                                name="cost"
                                render={({ field: { onChange, ...field } }) => (
                                    <CurrencyInput
                                        {...field}
                                        disabled={isDisabled(field.name)}
                                        onValueChange={(newValue = '') => {
                                            onChange(newValue)
                                        }}
                                        placeholder="Cost"
                                    />
                                )}
                            />
                            <FormFieldWrapper
                                className="relative"
                                control={form.control}
                                description="mm/dd/yyyy"
                                descriptionClassName="absolute top-0 right-0"
                                label="Entry Date *"
                                name="entry_date"
                                render={({ field }) => (
                                    <InputDate
                                        {...field}
                                        className="block"
                                        disabled={isDisabled(field.name)}
                                        placeholder="Entry Date"
                                        value={field.value ?? ''}
                                    />
                                )}
                            />
                        </div>
                        <FormFieldWrapper
                            control={form.control}
                            label="Asset Photo"
                            name="media_url"
                            render={({ field }) => (
                                <ImageField
                                    {...field}
                                    placeholder="Upload Asset Photo"
                                    value={form.watch('media_url')}
                                />
                            )}
                        />
                        <FormFieldWrapper
                            control={form.control}
                            label="Asset Description *"
                            name="description"
                            render={({ field }) => (
                                <TextEditor
                                    {...field}
                                    content={field.value}
                                    disabled={isDisabled(field.name)}
                                    placeholder="Asset Description..."
                                    textEditorClassName="bg-background !max-w-none"
                                />
                            )}
                        />
                    </fieldset>
                </fieldset>
                <FormFooterResetSubmit
                    className="sticky bottom-0 bg-background/80"
                    disableSubmit={!form.formState.isDirty}
                    error={error}
                    isLoading={isPending}
                    onReset={() => reset()}
                    readOnly={formProps.readOnly}
                    submitText={assetId ? 'Update' : 'Create'}
                />
            </form>
        </Form>
    )
}

export const MemberAssetCreateUpdateFormModal = ({
    title = 'Create Asset',
    description = 'Fill out the form to add or update asset.',
    className,
    formProps,
    ...props
}: IModalProps & {
    formProps: Omit<IMemberAssetFormProps, 'className'>
}) => {
    return (
        <Modal
            className={cn('!max-w-2xl', className)}
            description={description}
            title={title}
            {...props}
        >
            <MemberAssetCreateUpdateForm
                {...formProps}
                onSuccess={(createdData) => {
                    formProps?.onSuccess?.(createdData)
                    props.onOpenChange?.(false)
                }}
            />
        </Modal>
    )
}

export default MemberAssetCreateUpdateForm
