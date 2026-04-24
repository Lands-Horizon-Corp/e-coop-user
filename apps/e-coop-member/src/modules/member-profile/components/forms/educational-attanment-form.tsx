import { useForm } from 'react-hook-form'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import { cn } from '@e-coop-monorepo/shared/helpers'
import { useFormHelper } from '@e-coop-monorepo/shared/hooks'
import { IClassProps, IForm, TEntityId } from '@e-coop-monorepo/shared/types'
import FormFooterResetSubmit from '@e-coop-monorepo/ui/components/form-components/form-footer-reset-submit'
import Modal, { IModalProps } from '@e-coop-monorepo/ui/components/modals/modal'
import { Form } from '@e-coop-monorepo/ui/components/ui/form'
import FormFieldWrapper from '@e-coop-monorepo/ui/components/ui/form-field-wrapper'
import { Input } from '@e-coop-monorepo/ui/components/ui/input'
import TextEditor from '@e-coop-monorepo/ui/components/ui/text-editor'

import { IMemberProfileEducationalAttainmentRequest } from '../../member-profile.types'
import { MemberEducationalAttainmentSchema } from '../../member-profile.validation'
import EducationalAttainmentCombobox from '../comboboxes/educational-attainment-combobox'

export interface IMemberEducationalAttainmentFormProps
    extends
        IClassProps,
        IForm<
            Partial<IMemberProfileEducationalAttainmentRequest>,
            IMemberProfileEducationalAttainmentRequest,
            string
        > {
    memberProfileId: TEntityId
    educationalAttainmentId?: TEntityId
}

const MemberEducationalAttainmentCreateUpdateForm = ({
    // memberProfileId,
    educationalAttainmentId,
    className,
    ...formProps
}: IMemberEducationalAttainmentFormProps) => {
    const form = useForm<IMemberProfileEducationalAttainmentRequest>({
        resolver: standardSchemaResolver(MemberEducationalAttainmentSchema),
        reValidateMode: 'onChange',
        mode: 'onSubmit',
        defaultValues: {
            school_year: new Date().getFullYear(),
            educational_attainment: 'college graduate',
            ...formProps.defaultValues,
        },
    })

    // const createMutation = useCreateEducationalAttainmentForMember({ ... })
    // const updateMutation = useUpdateEducationalAttainmentForMember({ ... })

    const { formRef, isDisabled } =
        useFormHelper<IMemberProfileEducationalAttainmentRequest>({
            form,
            ...formProps,
        })

    // Commented out onSubmit for now
    // const onSubmit = form.handleSubmit((formData) => {
    //     if (educationalAttainmentId) {
    //         updateMutation.mutate({ memberProfileId, educationalAttainmentId, data: formData })
    //     } else {
    //         createMutation.mutate({ memberProfileId, data: formData })
    //     }
    // }, handleFocusError)

    // const { error: rawError, isPending, reset } = educationalAttainmentId ? updateMutation : createMutation
    // const error = serverRequestErrExtractor({ error: rawError })

    return (
        <Form {...form}>
            <form
                className={cn('flex w-full flex-col gap-y-4', className)}
                // onSubmit={onSubmit} // Removed for now
                ref={formRef}
            >
                <fieldset className="grid gap-x-6 gap-y-4 sm:gap-y-3">
                    <fieldset className="space-y-3">
                        <FormFieldWrapper
                            control={form.control}
                            label="School Name"
                            name="school_name"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    autoComplete="organization"
                                    disabled={isDisabled(field.name)}
                                    id={field.name}
                                    placeholder="School Name"
                                />
                            )}
                        />
                        <FormFieldWrapper
                            control={form.control}
                            label="Year Graduated"
                            name="school_year"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    autoComplete="year"
                                    disabled={isDisabled(field.name)}
                                    id={field.name}
                                    max={new Date().getFullYear()}
                                    min={1900}
                                    placeholder="Year Graduated"
                                    step={1}
                                    type="number"
                                />
                            )}
                        />
                        <FormFieldWrapper
                            control={form.control}
                            label="Educational Attainment"
                            name="educational_attainment"
                            render={({ field }) => (
                                <EducationalAttainmentCombobox
                                    {...field}
                                    disabled={isDisabled(field.name)}
                                    id={field.name}
                                    placeholder="Program / Course"
                                />
                            )}
                        />
                        <FormFieldWrapper
                            control={form.control}
                            label="Program / Course *"
                            name="program_course"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    autoComplete="course"
                                    disabled={isDisabled(field.name)}
                                    id={field.name}
                                    placeholder="Program / Course"
                                />
                            )}
                        />
                        <FormFieldWrapper
                            control={form.control}
                            label="Description"
                            name="description"
                            render={({ field }) => (
                                <TextEditor
                                    {...field}
                                    content={field.value}
                                    disabled={isDisabled(field.name)}
                                    placeholder="Description"
                                    textEditorClassName="!max-w-none bg-background"
                                />
                            )}
                        />
                    </fieldset>
                </fieldset>
                {/* Keep footer for resetting/visual */}
                <FormFooterResetSubmit
                    className="sticky -bottom-5"
                    disableSubmit={!form.formState.isDirty}
                    // error={error} // No error for now
                    isLoading={false} // Not submitting yet
                    onReset={() => form.reset()}
                    readOnly={formProps.readOnly}
                    submitText={educationalAttainmentId ? 'Update' : 'Create'}
                />
            </form>
        </Form>
    )
}

export const MemberEducationalAttainmentCreateUpdateFormModal = ({
    title = 'Create Educational Attainment',
    description = 'Fill out the form to add or update educational attainment.',
    className,
    formProps,
    ...props
}: IModalProps & {
    formProps: Omit<IMemberEducationalAttainmentFormProps, 'className'>
}) => {
    return (
        <Modal
            className={cn('!max-w-xl', className)}
            description={description}
            title={title}
            {...props}
        >
            <MemberEducationalAttainmentCreateUpdateForm
                {...formProps}
                onSuccess={(createdData) => {
                    formProps?.onSuccess?.(createdData)
                    props.onOpenChange?.(false)
                }}
            />
        </Modal>
    )
}

export default MemberEducationalAttainmentCreateUpdateForm
