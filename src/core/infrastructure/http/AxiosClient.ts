import { ACCESS_TOKEN_COOKIE_NAME } from '@/shared/api/api-routes'
import { getCookie } from '@/shared/api/cookies-util'
import { HttpHandler } from '@/shared/api/http-handler'
import { HTTP_STATUS_CODES } from '@/shared/api/http-status-codes'
import { DEFAULT_SUCCESS_MESSAGE } from '@/shared/constants/messages'
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import toast from 'react-hot-toast'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  successMessage?: string
}

export class AxiosClient implements HttpHandler {
  private static instance: AxiosClient
  private axiosInstance: AxiosInstance

  private constructor() {
    this.axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.axiosInstance.interceptors.response.use(
      (response) => {
        const customConfig = response.config as CustomAxiosRequestConfig
        const successMessage = customConfig.successMessage || DEFAULT_SUCCESS_MESSAGE

        if (!['get'].includes(response.config.method || '')) toast.success(successMessage)
        return response
      },
      (error) => {
        if (error.response) {
          toast.error(`Error: ${error.response.status} ${error.response.data?.message || error.message}`)
        } else {
          toast.error(`Error: ${error.message}`)
        }
        if (error.response?.status === HTTP_STATUS_CODES.FORBIDDEN) {
          if (typeof window !== 'undefined') {
            window.location.href = '/dashboard'
          }
        }
        return Promise.reject(error)
      },
    )
  }

  public static getInstance(): AxiosClient {
    if (!this.instance) {
      this.instance = new AxiosClient()
    }
    return this.instance
  }

  async get<T>(url: string, config?: CustomAxiosRequestConfig): Promise<T> {
    const promise = this.axiosInstance.get<T>(url, config)
    const response: AxiosResponse<T> = await promise
    return response.data
  }

  async post<T>(url: string, data: any, config?: CustomAxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config)
    return response.data
  }

  async put<T>(url: string, data: any, config?: CustomAxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config)
    return response.data
  }

  async patch<T>(url: string, data: any, config?: CustomAxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.patch(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: CustomAxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config)
    return response.data
  }
}
