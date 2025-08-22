import { AxiosRequestConfig } from "axios"
import axiosClient from "./client"
import { DataResponse } from "../models/response.model"
import { getSessionLocal } from "../uitls"

type Method = 'get' | 'post' | 'put' | 'delete'

interface RequestOptions extends AxiosRequestConfig {
    hasAuth?: boolean
    isLoading?: boolean,
}
const getAuthHeader = () => {
    const token = getSessionLocal()?.accessToken
    return token ?{ Authorization: `Bearer ${token}` } :{}
}

async function request<T = any>(
    method: Method,
    url: string,
    data: any = null,
    options: RequestOptions = {}
): Promise<T | undefined | null> {
    const { hasAuth, params, headers } = options

    const config = {
        method,
        url,
        data,
        params,
        headers: {
            ...(hasAuth ? getAuthHeader() : {}),
            ...headers,
        },
    }

    const res: DataResponse<T> = (await axiosClient.request<DataResponse<T>>(config))?.data
    return res?.data
}

// Các method tiện dụng
const apiBase = {
    get: <T = any>(url: string, options?: RequestOptions) => request<T>('get', url, null, options),
    post: <T = any>(url: string, data: any, options?: RequestOptions) => request<T>('post', url, data, options),
    put: <T = any>(url: string, data: any, options?: RequestOptions) => request<T>('put', url, data, options),
    delete: <T = any>(url: string, options?: RequestOptions) => request<T>('delete', url, {}, options),
}

export default apiBase
