import type { Path } from 'react-hook-form'

import type { IClassProps } from '@e-coop-monorepo/shared/types'

export interface IForm<
    TDefaultVals,
    IData = unknown,
    IErr = unknown,
    THidisable = TDefaultVals,
> extends IClassProps {
    readOnly?: boolean
    defaultValues?: TDefaultVals
    resetOnDefaultChange?: boolean
    hiddenFields?: Array<Path<THidisable>>
    disabledFields?: Array<Path<THidisable>>
    autoSave?: boolean
    onErrorFocus?: boolean
    onSuccess?: (data: IData) => void
    onError?: (e: IErr) => void
    onLoading?: (loadingState: boolean) => void
    onSubmit?: (formDatas: Required<TDefaultVals>) => void
    onFormDirty?: (isDirty: boolean) => void
}
