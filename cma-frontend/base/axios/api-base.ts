import { AxiosRequestConfig } from "axios"
import axiosClient from "./client"
import { DataResponse } from "../models/response.model"
import { showAlertError } from "@/base/ui/toaster"
import { SESSION_LOCAL_STORAGE_KEY } from "../uitls"

type Method = 'get' | 'post' | 'put' | 'delete'

interface RequestOptions extends AxiosRequestConfig {
    hasAuth?: boolean
    isLoading?: boolean,
}

const getAuthHeader = () => {
    if (typeof window === 'undefined') return {}
    const token = localStorage.getItem(SESSION_LOCAL_STORAGE_KEY)
    const tokenObj = token ? JSON.parse(token) : null
    return tokenObj ? { Authorization: `Bearer ${tokenObj.accessToekn}` } : {}
}

async function request<T = any>(
    method: Method,
    url: string,
    data: any = null,
    options: RequestOptions = {}
): Promise<T> {
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

    const res: DataResponse<T> = (await axiosClient.request<DataResponse<T>>(config)).data
    if (!res.success) showAlertError(res.message)
    return res.data
}

// Các method tiện dụng
const apiBase = {
    get: <T = any>(url: string, options?: RequestOptions) => request<T>('get', url, null, options),
    post: <T = any>(url: string, data: any, options?: RequestOptions) => request<T>('post', url, data, options),
    put: <T = any>(url: string, data: any, options?: RequestOptions) => request<T>('put', url, data, options),
    delete: <T = any>(url: string, options?: RequestOptions) => request<T>('delete', url, null, options),
}

export default apiBase
