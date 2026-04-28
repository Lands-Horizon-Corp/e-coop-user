import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import z from 'zod'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

import {
    useCreateGeneratedReport,
    useUpdateGeneratedReportById,
} from '@e-coop-monorepo/modules/generated-report'
import {
    IGeneratedReport,
    IGeneratedReportRequest,
} from '@e-coop-monorepo/modules/generated-report'
import { GeneratedReportSchema } from '@e-coop-monorepo/modules/generated-report'
import { IFilterState } from '@e-coop-monorepo/shared/contexts'
import { withToastCallbacks } from '@e-coop-monorepo/shared/helpers'
import { serverRequestErrExtractor } from '@e-coop-monorepo/shared/helpers'
import { extractColumnMetadata } from '@e-coop-monorepo/shared/helpers'
import { useFormHelper } from '@e-coop-monorepo/shared/hooks'
import { cn } from '@e-coop-monorepo/shared/tw-utils'
import { IClassProps, IForm, TEntityId } from '@e-coop-monorepo/shared/types'
import { FormFooterResetSubmit } from '@e-coop-monorepo/ui'
import { IModalProps, Modal } from '@e-coop-monorepo/ui'
import { Form } from '@e-coop-monorepo/ui'
import { FormErrorMessage } from '@e-coop-monorepo/ui'
import { FormFieldWrapper } from '@e-coop-monorepo/ui'
import { Input } from '@e-coop-monorepo/ui'
import { Textarea } from '@e-coop-monorepo/ui'
import { useGeneratedReportFilter } from '@e-coop-monorepo/ui'
import { GeneratedReportFilter } from '@e-coop-monorepo/ui'
import { ColumnDef, Table } from '@tanstack/react-table'

type TBankFormValues = z.input<typeof GeneratedReportSchema>

export interface IGeneratedReportFormProps<TData>
    extends
        IClassProps,
        IForm<
            Partial<IGeneratedReportRequest>,
            IGeneratedReport,
            Error,
            TBankFormValues
        > {
    reportId?: TEntityId
    type?: 'generate' | 'generate-report'
    reportPath?: string
    filterState?: IFilterState
    table?: Table<TData>
    columns?: ColumnDef<TData>[]
}

type TGenerateReportCreateUpdateModalServiceProps<TData> = {
    onSuccess?: (report: TData) => void
    onError?: (err: Error) => void
}

export const useGenerateReportCreateUpdateModalService = ({
    onSuccess,
    onError,
}: TGenerateReportCreateUpdateModalServiceProps<IGeneratedReport>) => {
    const createMutation = useCreateGeneratedReport({
        options: {
            ...withToastCallbacks({
                textSuccess: 'Report Created',
                onSuccess: onSuccess,
                onError: onError,
            }),
        },
    })

    const updateMutation = useUpdateGeneratedReportById({
        options: {
            ...withToastCallbacks({
                textSuccess: 'Report updated',
                onSuccess: onSuccess,
                onError: onError,
            }),
        },
    })

    return {
        createMutation,
        updateMutation,
    }
}

const GenerateReportCreateForm = <TData,>({
    className,
    reportId,
    table,
    columns,
    ...formProps
}: IGeneratedReportFormProps<TData>) => {
    const isEditMode = !!reportId

    const form = useForm<TBankFormValues>({
        resolver: standardSchemaResolver(GeneratedReportSchema),
        reValidateMode: 'onChange',
        mode: 'onSubmit',
        defaultValues: {
            description: '',
            ...formProps.defaultValues,
        },
    })

    const { formRef, handleFocusError, isDisabled, firstError } =
        useFormHelper<TBankFormValues>({
            form,
            autoSave: formProps.autoSave,
            readOnly: formProps.readOnly,
            hiddenFields: formProps.hiddenFields,
            disabledFields: formProps.disabledFields,
            defaultValues: formProps.defaultValues,
        })

    const { updateMutation, createMutation } =
        useGenerateReportCreateUpdateModalService({
            onSuccess: formProps.onSuccess,
            onError: formProps.onError,
        })

    const { finalFilterPayloadBase64 } = useGeneratedReportFilter()

    const onSubmit = form.handleSubmit((formData) => {
        if (reportId) {
            updateMutation.mutate({
                id: reportId,
                payload: {
                    ...formData,
                },
            })
        } else {
            createMutation.mutate({
                ...formData,
            })
        }
    }, handleFocusError)

    const {
        error: errorResponse,
        isPending,
        reset,
    } = reportId ? updateMutation : createMutation

    const error = serverRequestErrExtractor({ error: errorResponse })

    const filterColumns = extractColumnMetadata(columns ?? [], table)

    useEffect(() => {
        form.setValue('filter_search', finalFilterPayloadBase64)
    }, [finalFilterPayloadBase64, form])

    return (
        <Form {...form}>
            <form
                className={cn('flex w-full flex-col gap-y-4', className)}
                onSubmit={onSubmit}
                ref={formRef}
            >
                <div className="flex gap-x-5">
                    <fieldset
                        className="flex-1 grid gap-x-6 gap-y-4 sm:gap-y-3"
                        disabled={isPending || formProps.readOnly}
                    >
                        <fieldset className="space-y-3">
                            <FormErrorMessage errorMessage={firstError} />
                            <FormFieldWrapper
                                control={form.control}
                                label="Model Name"
                                name="name"
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        autoComplete="off"
                                        disabled={isDisabled(field.name)}
                                        id={field.name}
                                        placeholder="Model Name"
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
                                        autoComplete="off"
                                        disabled={isDisabled(field.name)}
                                        id={field.name}
                                        placeholder="Description"
                                    />
                                )}
                            />
                        </fieldset>
                        {!isEditMode && (
                            <GeneratedReportFilter columns={filterColumns} />
                        )}
                    </fieldset>
                </div>
                <FormFooterResetSubmit
                    error={error}
                    isLoading={isPending}
                    onReset={() => {
                        form.reset()
                        reset()
                    }}
                    readOnly={formProps.readOnly}
                    submitText={reportId ? 'Update Report' : 'Create Report'}
                />
            </form>
        </Form>
    )
}

export const GeneratedReportCreateFormModal = <TData,>({
    title = 'Generate Report',
    description = 'Fill out the form to generate report.',
    className,
    formProps,
    ...props
}: IModalProps & {
    formProps?: Omit<IGeneratedReportFormProps<TData>, 'className'>
}) => {
    return (
        <Modal
            className={cn('!w-fit min-w-fit', className)}
            description={description}
            title={title}
            {...props}
        >
            <GenerateReportCreateForm
                {...formProps}
                onSuccess={(createdData) => {
                    formProps?.onSuccess?.(createdData)
                    props.onOpenChange?.(false)
                }}
            />
        </Modal>
    )
}

export default GeneratedReportCreateFormModal
