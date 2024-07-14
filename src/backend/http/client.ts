import https from "https"
import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

import { GENERIC_ERROR_MESSAGE, HTTPError } from "~backend/utils"

export class HTTPClient {
    private static instance: HTTPClient
    private axiosInstance: AxiosInstance

    private constructor() {
        const baseURL = process.env.PLASMO_PUBLIC_BASE_API_URL || ""
        this.axiosInstance = axios.create({
            baseURL: baseURL,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        })
    }

    public static inst(): HTTPClient {
        if (!HTTPClient.instance) {
            HTTPClient.instance = new HTTPClient()
        }
        return HTTPClient.instance
    }

    private handleError(e: any, url: string, method: string) {
        if (e.response) {
            throw new HTTPError(
                e.response.status,
                e.response.statusText,
                url,
                method,
                e
            )
        } else {
            throw new HTTPError(500, GENERIC_ERROR_MESSAGE, url, method, e)
        }
    }

    public async get(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse | undefined> {
        try {
            const response = await this.axiosInstance.get(url, config)
            return response
        } catch (error) {
            this.handleError(error, url, "GET")
        }
    }

    public async post(
        url: string,
        data: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse | undefined> {
        try {
            const response = await this.axiosInstance.post(url, data, config)
            return response
        } catch (error) {
            this.handleError(error, url, "POST")
        }
    }
}
