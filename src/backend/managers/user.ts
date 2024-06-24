import { HTTPClient } from "../http"

export function getPassword(email: string) {
    HTTPClient.inst().post("/users/get-password", email)
}

export function validatePassword(email: string, password: string) {
    return HTTPClient.inst().post("/users/validate-password", {
        email,
        password
    })
}
