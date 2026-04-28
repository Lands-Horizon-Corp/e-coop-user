import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import { useFormHelper } from '@e-coop-monorepo/shared/hooks'
import { cn } from '@e-coop-monorepo/shared/tw-utils'
import { IClassProps, IForm, TEntityId } from '@e-coop-monorepo/shared/types'
import FormFooterResetSubmit from '@e-coop-monorepo/ui'
import { VerifiedPatchIcon } from '@e-coop-monorepo/ui'
import Modal, { IModalProps } from '@e-coop-monorepo/ui'
import { Form } from '@e-coop-monorepo/ui'
import FormFieldWrapper from '@e-coop-monorepo/ui'
import { Input } from '@e-coop-monorepo/ui'
import { PhoneInput } from '@e-coop-monorepo/ui'
import { Textarea } from '@e-coop-monorepo/ui'

import { IMemberContactReferenceRequest } from '../../member-profile.types'
import { MemberContactReferenceSchema } from '../../member-profile.validation'

// import { useCreateMemberProfileContactReference, useUpdateMemberProfileContactReference } from '../../member-contact-reference.service'

type TMemberContactReferenceFormValues = IMemberContactReferenceRequest

export interface IMemberContactReferenceFormProps
    extends
        IClassProps,
        IForm<
            Partial<IMemberContactReferenceRequest>,
            IMemberContactReferenceRequest,
            Error,
            TMemberContactReferenceFormValues
        > {
    memberProfileId: TEntityId
    contactReferenceId?: TEntityId
}

const MemberContactCreateUpdateForm = ({
    // memberProfileId,
    contactReferenceId,
    className,
    ...formProps
}: IMemberContactReferenceFormProps) => {
    const form = useForm<TMemberContactReferenceFormValues>({
        resolver: standardSchemaResolver(MemberContactReferenceSchema),
        reValidateMode: 'onChange',
        mode: 'onSubmit',
        defaultValues: {
            name: '',
            description: '',
            contact_number: '',
            ...formProps.defaultValues,
        },
    })

    // Commented out: real mutations removed for mock/demo mode
    // const createMutation = useCreateMemberProfileContactReference({...})
    // const updateMutation = useUpdateMemberProfileContactReference({...})

    const { formRef, handleFocusError, isDisabled } =
        useFormHelper<TMemberContactReferenceFormValues>({
            form,
            ...formProps,
        })

    // Mock submit
    const onSubmit = form.handleSubmit((formData) => {
        if (contactReferenceId) {
            toast.success('Contact Reference updated (mock).')
        } else {
            toast.success('Contact Reference created (mock).')
        }
        formProps?.onSuccess?.(formData)
    }, handleFocusError)

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
                            label="Name *"
                            name="name"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    disabled={isDisabled(field.name)}
                                    id={field.name}
                                    placeholder="Name"
                                />
                            )}
                        />
                        <FormFieldWrapper
                            control={form.control}
                            label="Contact Number *"
                            name="contact_number"
                            render={({ field, fieldState: { invalid } }) => (
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
                            control={form.control}
                            label="Description"
                            name="description"
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    disabled={isDisabled(field.name)}
                                    id={field.name}
                                    placeholder="Description"
                                />
                            )}
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
                    submitText={contactReferenceId ? 'Update' : 'Create'}
                />
            </form>
        </Form>
    )
}

export const MemberContactCreateUpdateFormModal = ({
    title = 'Create Contact Reference',
    description = 'Fill out the form to add or update contact reference.',
    className,
    formProps,
    ...props
}: IModalProps & {
    formProps: Omit<IMemberContactReferenceFormProps, 'className'>
}) => {
    return (
        <Modal
            className={cn('', className)}
            description={description}
            title={title}
            {...props}
        >
            <MemberContactCreateUpdateForm
                {...formProps}
                onSuccess={(createdData) => {
                    toast.success(
                        `Contact Reference ${formProps?.contactReferenceId ? 'updated' : 'created'} (mock).`
                    )
                    formProps?.onSuccess?.(createdData)
                    props.onOpenChange?.(false)
                }}
            />
        </Modal>
    )
}

export default MemberContactCreateUpdateForm
