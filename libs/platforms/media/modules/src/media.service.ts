import { useMutation } from '@tanstack/react-query'
import type { AxiosProgressEvent } from 'axios'

import type { IMedia } from '@ecoop/platforms/media/models'
// import { compressImage } from '@ecoop/shared/helpers/core-helpers'
import { Logger } from '@ecoop/shared/loggers'
import type { HookMutationOptions } from '@ecoop/shared/repositories'
import { createDataLayerFactory } from '@ecoop/shared/repositories'
import type { TEntityId } from '@ecoop/shared/types'

const { apiCrudService } = createDataLayerFactory({
    url: '/api/v1/media',
    baseKey: 'media',
})

const { API, route } = apiCrudService

// ⚙️🛠️ API SERVICE HERE

// Upload media
export const uploadMedia = async (
    file: File,
    onProgress?: (progressEvent: AxiosProgressEvent) => void
): Promise<IMedia> => {
    // Check if file is an image and compress it

    const formData = new FormData()
    formData.append('file', file)
    const response = await API.uploadFile<IMedia>(
        `${route}`,
        formData,
        {},
        {
            onUploadProgress: onProgress,
        }
    )

    return response.data
}

// Delete media
export const deleteMedia = async (id: TEntityId): Promise<void> => {
    await API.delete(`${route}/${id}`)
}

// 🪝 HOOK STARTS HERE

// Hook for uploading media
export const useUploadMedia = ({
    options,
    onProgress,
}: {
    options?: HookMutationOptions<IMedia, Error, { file: File }>
    onProgress?: (progressEvent: AxiosProgressEvent) => void
} = {}) => {
    return useMutation<IMedia, Error, { file: File }>({
        mutationFn: async ({ file }) => uploadMedia(file, onProgress),
        ...options,
    })
}

// Hook for deleting media
export const useDeleteMedia = ({
    options,
}: {
    options?: HookMutationOptions<void, Error, TEntityId>
} = {}) => {
    return useMutation<void, Error, TEntityId>({
        mutationFn: deleteMedia,
        ...options,
    })
}

export const logger = Logger.getInstance('media')
