import { HTTPClient } from "../http"

export class RecommendationManager {
    private _httpClient = HTTPClient.inst()
    public async createSchedule(
        courses: Array<string>
    ) {
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
                `Error creating a schedule for ${courses}`
            )
        }
    }

    public async validateCourse(course: string) {
        try{
            const result = await this._httpClient.post("search/search-course", {course})
            return true
        }
        catch (e)
        {
            console.log("Error searching for course")
            return false
        }
    }
}
