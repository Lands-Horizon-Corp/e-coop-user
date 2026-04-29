import { useForm } from 'react-hook-form'
import z from 'zod'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import { IMedia } from '@e-coop-monorepo/modules/media'
import { withToastCallbacks } from '@e-coop-monorepo/shared/helpers'
import { serverRequestErrExtractor } from '@e-coop-monorepo/shared/helpers'
import { useFormHelper } from '@e-coop-monorepo/shared/hooks'
import { cn } from '@e-coop-monorepo/shared/tw-utils'
import { IClassProps, IForm } from '@e-coop-monorepo/shared/types'
import FormFooterResetSubmit from '@e-coop-monorepo/ui/core'
import Modal, { IModalProps } from '@e-coop-monorepo/ui/core'
import { Form } from '@e-coop-monorepo/ui/core'
import FormFieldWrapper from '@e-coop-monorepo/ui/core'
import { Input } from '@e-coop-monorepo/ui/core'
import { Textarea } from '@e-coop-monorepo/ui/core'

import { useUpdateMemberProfileMediaById } from '../..'
import {
    IMemberProfileMedia,
    IMemberProfileMediaRequest,
} from '../../member-profile-media.types'
import { MemberProfileMediaSchema } from '../../member-profile-media.validation'
import MemberMediaItem from '../member-media-item'

type TMemberProfileMediaFormValues = z.infer<
    typeof MemberProfileMediaSchema
> & {
    media?: IMedia | null
}

export interface IMemberProfileMediaFormProps
    extends
        IClassProps,
        IForm<
            Partial<IMemberProfileMediaRequest>,
            IMemberProfileMedia,
            Error,
            TMemberProfileMediaFormValues
        > {}

const UpdateMemberProfileMediaForm = ({
    className,
    ...formProps
}: IMemberProfileMediaFormProps) => {
    const form = useForm<TMemberProfileMediaFormValues>({
        resolver: standardSchemaResolver(MemberProfileMediaSchema),
        reValidateMode: 'onChange',
        mode: 'onSubmit',
        defaultValues: {
            name: '',
            description: '',
            ...formProps.defaultValues,
        },
    })

    const updateMutation = useUpdateMemberProfileMediaById({
        options: {
            ...withToastCallbacks({
                textSuccess: 'Member profile media updated',
                onSuccess: formProps.onSuccess,
                onError: formProps.onError,
            }),
        },
    })

    const { formRef, handleFocusError, isDisabled } =
        useFormHelper<TMemberProfileMediaFormValues>({
            form,
            autoSave: formProps.autoSave,
            readOnly: formProps.readOnly,
            hiddenFields: formProps.hiddenFields,
            disabledFields: formProps.disabledFields,
            defaultValues: formProps.defaultValues,
        })

    const onSubmit = form.handleSubmit((formData) => {
        updateMutation.mutate({
            id: formData.id,
            payload: formData,
        })
    }, handleFocusError)

    const { error: errorResponse, isPending, reset } = updateMutation

    const error = serverRequestErrExtractor({ error: errorResponse })

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
                            label="Name"
                            name="name"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    autoComplete="off"
                                    disabled={isDisabled(field.name)}
                                    id={field.name}
                                    placeholder="Name"
                                />
                            )}
                        />
                        <MemberMediaItem
                            memberMedia={
                                form.getValues() as IMemberProfileMedia
                            }
                        />
                        <FormFieldWrapper
                            control={form.control}
                            label="Description"
                            name="description"
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    autoComplete="off"
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
                    submitText="Update"
                />
            </form>
        </Form>
    )
}

export const UpdateMemberProfileMediaFormModal = ({
    title = 'Update Member Profile Media',
    description = 'Fill out the form to update the member profile media.',
    className,
    formProps,
    ...props
}: IModalProps & {
    formProps: Omit<IMemberProfileMediaFormProps, 'className'>
}) => {
    return (
        <Modal
            className={cn('', className)}
            description={description}
            title={title}
            {...props}
        >
            <UpdateMemberProfileMediaForm
                {...formProps}
                onSuccess={(updatedData) => {
                    formProps?.onSuccess?.(updatedData)
                    props.onOpenChange?.(false)
                }}
            />
        </Modal>
    )
}

export default UpdateMemberProfileMediaForm
