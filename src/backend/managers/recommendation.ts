import { HTTPClient } from "../http"
import type { AxiosResponse } from "axios"

export class RecommendationManager{
    private _httpClient = HTTPClient.inst()
    public async createSchedule(
        courses: Array<string>
    ): Promise<AxiosResponse<Array<string> | undefined>> {
        try {
            const result = await this._httpClient.post(
                "/recommend/schedule",
                {
                    courses
                }
            )
            return result
        } catch (e) {
            console.log(
                `Error scheduling courses`
            )
            throw new Error(e)
        }
    }
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
    public async validateCourse(course: string) {
        try {
            const result = await this._httpClient.post("/search/search-course", { course })
            return true
        } catch (error) {
            return false
        }
    }
    
}
