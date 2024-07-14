export const GENERIC_ERROR_MESSAGE =
    "An unexpected error occurred. Please try again later."

export class HTTPError extends Error {
    public readonly statusCode: number
    public readonly url: string | undefined
    public readonly method: string | undefined
    public readonly cause: Error | undefined

    constructor(
        statusCode: number,
        message: string,
        url?: string,
        method?: string,
        cause?: Error
    ) {
        super(message || `[HTTP ERROR] ${statusCode}`)
        this.name = "[HTTP ERROR]"
        this.statusCode = statusCode
        this.url = url
        this.method = method
        this.cause = cause
    }
}
