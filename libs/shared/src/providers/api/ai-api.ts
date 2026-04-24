import axios, {
    type AxiosRequestConfig,
    type AxiosResponse,
} from 'axios'

export interface IRequestParams {
    [key: string]: unknown
}


export const AI_API = {
      async uploadFile<R = unknown>(
        url: string,
        formData: FormData,
        params?: IRequestParams,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<R>> {
        return axios.post<R>(url, formData, {
            params,
            ...config,
            headers: {
                'Content-Type': 'multipart/form-data',
                ...config?.headers,
            },
        })
    },
}