import type {
    IContactUs,
    IContactUsRequest,
} from '@ecoop/domains/communications/models'
import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

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
