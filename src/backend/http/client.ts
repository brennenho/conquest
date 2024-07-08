import https from "https"
import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

export class HTTPClient {
    private static instance: HTTPClient
    private axiosInstance: AxiosInstance

    private constructor() {
        const baseURL = process.env.PLASMO_PUBLIC_API_URL || ""
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

    public async get(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse | undefined> {
        try {
            console.log("GET request to", url)
            const response = await this.axiosInstance.get(url, config)
            return response
        } catch (error) {
            console.error("Error performing GET request:", error)
            return undefined
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
            console.error("Error performing POST request:", error)
            return undefined
        }
    }
}
