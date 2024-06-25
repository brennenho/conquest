import { HTTPClient } from "../http"
export class RatingManager{
    private _httpClient = HTTPClient.inst()
    public async getProfessor(first_name: string, last_name: string, department: string){
        const result = await this._httpClient.post("/users/search-professor", {
            first_name,
            last_name,
            department
        })
        return result.data.result[4]
    }
}