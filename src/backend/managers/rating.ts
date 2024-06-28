import { HTTPClient } from "../http"

export class RatingManager {
    private _httpClient = HTTPClient.inst()
    public async getProfessor(
        first_name: string,
        last_name: string,
        department: string
    ) {
        console.log("getProfessor")
        const result = await this._httpClient.post(
            "/professors/search-professor",
            {
                first_name,
                last_name,
                department
            }
        )
        return result.data.result
    }
}
