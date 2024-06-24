import { StorageManager } from "."
import { HTTPClient } from "../http"

export class UserManager {
    private _httpClient = HTTPClient.inst()
    private _storageManager = new StorageManager()

    public async getPassword(email: string) {
        await this._httpClient.post("/users/get-password", email)
    }

    public async validatePassword(email: string, password: string) {
        const result = await this._httpClient.post("/users/validate-password", {
            email,
            password
        })
        return result
    }

    public async setValidationWindow(status: boolean) {
        await this._storageManager.set("validationWindow", status)
    }

    public async getValidationWindow() {
        return this._storageManager.get("validationWindow")
    }

    public async setEmail(email: string) {
        await this._storageManager.set("enteredEmail", email)
    }

    public async getEmail() {
        return this._storageManager.get("enteredEmail")
    }
}
