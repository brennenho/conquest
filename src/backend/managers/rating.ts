import { HTTPClient } from "../http"

export class RatingManager {
    private _httpClient = HTTPClient.inst()
    public async getProfessor(
        first_name: string,
        last_name: string,
        department: string
    ) {
        try {
            const result = await this._httpClient.post(
                "/search/search-professor",
                {
                    first_name,
                    last_name,
                    department
                }
            )
            return result.data.result
        } catch (e) {
            console.log(
                `Error searching for professor: ${first_name} ${last_name}`
            )
        }
    }
}
