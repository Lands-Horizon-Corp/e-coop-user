import { useForm } from 'react-hook-form'
import type z from 'zod'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import { CurrencyInput } from '@ecoop/modules/currency'
import type { IMedia } from '@ecoop/modules/media'
import { withToastCallbacks } from '@ecoop/shared/helpers'
import { toInputDateString } from '@ecoop/shared/helpers'
import { serverRequestErrExtractor } from '@ecoop/shared/helpers'
import { useFormHelper } from '@ecoop/shared/hooks'
import { cn } from '@ecoop/shared/tw-utils'
import type { IClassProps, IForm, TEntityId } from '@ecoop/shared/types'
import FormFooterResetSubmit from '@ecoop/ui/core'
import type { IModalProps } from '@ecoop/ui/core'
import Modal from '@ecoop/ui/core'
import { Form } from '@ecoop/ui/core'
import FormFieldWrapper from '@ecoop/ui/core'
import ImageField from '@ecoop/ui/core'
import { Input } from '@ecoop/ui/core'
import InputDate from '@ecoop/ui/core'

import {
    useCreateMemberProfileIncome,
    useUpdateMemberProfileIncome,
} from '../../member-income.service'
import type { IMemberIncome } from '../../member-income.types'
import { MemberIncomeSchema } from '../../member-income.validation'

type TMemberIncomeFormValues = z.infer<typeof MemberIncomeSchema>

export interface IMemberIncomeFormProps
    extends
        IClassProps,
        IForm<
            Partial<TMemberIncomeFormValues>,
            IMemberIncome,
            string,
            TMemberIncomeFormValues
        > {
    memberProfileId: TEntityId
    incomeId?: TEntityId
}

const MemberIncomeCreateUpdateForm = ({
    memberProfileId,
    incomeId,
    className,
    ...formProps
}: IMemberIncomeFormProps) => {
    const form = useForm<TMemberIncomeFormValues>({
        resolver: standardSchemaResolver(MemberIncomeSchema),
        reValidateMode: 'onChange',
        mode: 'onSubmit',
        defaultValues: {
            source: '',
            amount: 0,
            name: '',
            ...formProps.defaultValues,
            release_date: toInputDateString(
                formProps.defaultValues?.release_date ?? new Date()
            ),
        },
    })

    const createMutation = useCreateMemberProfileIncome({
        options: {
            ...withToastCallbacks({
                textSuccess: 'Created',
                onSuccess: formProps.onSuccess,
                onError: formProps.onError,
            }),
        },
    })

    const updateMutation = useUpdateMemberProfileIncome({
        options: {
            ...withToastCallbacks({
                textSuccess: 'Updated',
                onSuccess: formProps.onSuccess,
                onError: formProps.onError,
            }),
        },
    })

    const { formRef, handleFocusError, isDisabled } =
        useFormHelper<TMemberIncomeFormValues>({
            form,
            ...formProps,
        })

    const onSubmit = form.handleSubmit((formData) => {
        if (incomeId) {
            updateMutation.mutate({
                memberProfileId,
                incomeId,
                data: formData,
            })
        } else {
            createMutation.mutate({
                memberProfileId,
                data: formData,
            })
        }
    }, handleFocusError)

    const {
        error: rawError,
        isPending,
        reset,
    } = incomeId ? updateMutation : createMutation

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
                            label="Income Source *"
                            name="source"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    disabled={isDisabled(field.name)}
                                    id={field.name}
                                    placeholder="Income Source"
                                />
                            )}
                        />
                        <div className="grid grid-cols-2 gap-x-2">
                            <FormFieldWrapper
                                control={form.control}
                                label="Amount *"
                                name="amount"
                                render={({ field: { onChange, ...field } }) => (
                                    <CurrencyInput
                                        {...field}
                                        disabled={isDisabled(field.name)}
                                        onValueChange={(newValue = '') => {
                                            onChange(newValue)
                                        }}
                                        placeholder="Amount"
                                    />
                                )}
                            />
                            <FormFieldWrapper
                                className="relative"
                                control={form.control}
                                description="mm/dd/yyyy"
                                descriptionClassName="absolute top-0 right-0"
                                label="Date Received *"
                                name="release_date"
                                render={({ field }) => (
                                    <InputDate
                                        {...field}
                                        className="block"
                                        disabled={isDisabled(field.name)}
                                        placeholder="Release Date"
                                        value={field.value ?? ''}
                                    />
                                )}
                            />
                        </div>
                        <FormFieldWrapper
                            control={form.control}
                            label="Photo"
                            name="media_id"
                            render={({ field }) => {
                                const value = form.watch('media')

                                return (
                                    <ImageField
                                        {...field}
                                        onChange={(newImage) => {
                                            if (newImage)
                                                field.onChange(newImage.id)
                                            else field.onChange(undefined)

                                            form.setValue('media', newImage)
                                        }}
                                        placeholder="Upload Income Photo"
                                        value={
                                            value
                                                ? (value as IMedia).download_url
                                                : value
                                        }
                                    />
                                )
                            }}
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
                    submitText={incomeId ? 'Update' : 'Create'}
                />
            </form>
        </Form>
    )
}

export const MemberIncomeCreateUpdateFormModal = ({
    title = 'Create Income',
    description = 'Fill out the form to add or update income.',
    className,
    formProps,
    ...props
}: IModalProps & {
    formProps: Omit<IMemberIncomeFormProps, 'className'>
}) => {
    return (
        <Modal
            className={cn('', className)}
            description={description}
            title={title}
            {...props}
        >
            <MemberIncomeCreateUpdateForm
                {...formProps}
                onSuccess={(createdData) => {
                    formProps?.onSuccess?.(createdData)
                    props.onOpenChange?.(false)
                }}
            />
        </Modal>
    )
}

export default MemberIncomeCreateUpdateForm
