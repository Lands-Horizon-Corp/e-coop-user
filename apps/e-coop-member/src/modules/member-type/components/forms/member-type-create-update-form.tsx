import { useForm } from 'react-hook-form'
import type z from 'zod'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import type { IMemberType } from '@e-coop-monorepo/modules/member-type'
import {
    MemberTypeSchema,
    useCreateMemberType,
    useUpdateMemberTypeById,
} from '@e-coop-monorepo/modules/member-type'
import { serverRequestErrExtractor } from '@e-coop-monorepo/shared/helpers'
import { useFormHelper } from '@e-coop-monorepo/shared/hooks'
import { cn } from '@e-coop-monorepo/shared/tw-utils'
import type {
    IClassProps,
    IForm,
    TEntityId,
} from '@e-coop-monorepo/shared/types'
import FormFooterResetSubmit from '@e-coop-monorepo/ui/core'
import type { IModalProps } from '@e-coop-monorepo/ui/core'
import Modal from '@e-coop-monorepo/ui/core'
import { Form } from '@e-coop-monorepo/ui/core'
import FormFieldWrapper from '@e-coop-monorepo/ui/core'
import { Input } from '@e-coop-monorepo/ui/core'
import { Textarea } from '@e-coop-monorepo/ui/core'

export type TMemberTypeForm = z.infer<typeof MemberTypeSchema>

export interface IMemberTypeCreateUpdateFormProps
    extends IClassProps, IForm<Partial<TMemberTypeForm>, IMemberType> {
    memberTypeId?: TEntityId
}

const MemberTypeCreateUpdateForm = ({
    memberTypeId,
    className,
    ...formProps
}: IMemberTypeCreateUpdateFormProps) => {
    const form = useForm<TMemberTypeForm>({
        resolver: standardSchemaResolver(MemberTypeSchema),
        reValidateMode: 'onChange',
        mode: 'onSubmit',
        defaultValues: {
            name: '',
            prefix: '',
            description: '',
            ...formProps.defaultValues,
        },
    })

    const createMutation = useCreateMemberType({
        options: {
            onSuccess: formProps.onSuccess,
            onError: formProps.onError,
        },
    })

    const updateMutation = useUpdateMemberTypeById({
        options: {
            onSuccess: formProps.onSuccess,
            onError: formProps.onError,
        },
    })

    const { formRef, handleFocusError, isDisabled } =
        useFormHelper<TMemberTypeForm>({
            form,
            ...formProps,
        })

    const onSubmit = form.handleSubmit((formData) => {
        if (memberTypeId) {
            updateMutation.mutate({ id: memberTypeId, payload: formData })
        } else {
            createMutation.mutate(formData)
        }
    }, handleFocusError)

    const {
        error: rawError,
        isPending,
        reset,
    } = memberTypeId ? updateMutation : createMutation

    const error = serverRequestErrExtractor({ error: rawError })

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
                                    autoComplete="member-type-name"
                                    disabled={isDisabled(field.name)}
                                    id={field.name}
                                    placeholder="Member Type Name"
                                />
                            )}
                        />

                        <FormFieldWrapper
                            control={form.control}
                            label="Prefix"
                            name="prefix"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    autoComplete="member-type-prefix"
                                    disabled={isDisabled(field.name)}
                                    id={field.name}
                                    placeholder="Prefix"
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
                                    autoComplete="member-type-description"
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
                    submitText={memberTypeId ? 'Update' : 'Create'}
                />
            </form>
        </Form>
    )
}

export const MemberTypeCreateUpdateFormModal = ({
    title = 'Create Member Type',
    description = 'Fill out the form to add a new member type.',
    className,
    formProps,
    ...props
}: IModalProps & {
    formProps?: Omit<IMemberTypeCreateUpdateFormProps, 'className'>
}) => {
    return (
        <Modal
            className={cn('', className)}
            description={description}
            title={title}
            {...props}
        >
            <MemberTypeCreateUpdateForm
                {...formProps}
                onSuccess={(createdData) => {
                    formProps?.onSuccess?.(createdData)
                    props.onOpenChange?.(false)
                }}
            />
        </Modal>
    )
}

export default MemberTypeCreateUpdateForm
