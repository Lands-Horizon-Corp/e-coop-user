import { Logger } from '@e-coop-monorepo/shared/helpers'
import { createDataLayerFactory } from '@e-coop-monorepo/shared/repositories'

import { IContactUs, IContactUsRequest } from './contact-us.types'

const { apiCrudHooks, apiCrudService } = createDataLayerFactory<
    IContactUs,
    IContactUsRequest
>({
    url: '/api/v1/contact',
    baseKey: 'contact-us',
})

export const {
    useCreate,
    useDeleteById,
    useDeleteMany,
    useGetAll,
    useGetById,
    useGetPaginated,
    useUpdateById,
} = apiCrudHooks

export const ContactUsAPI = apiCrudService

export const logger = Logger.getInstance('contact-us')
