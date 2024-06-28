import $ from "jquery"

import { StorageManager } from "../managers"
import { timeToMins } from "../utils"

export async function parseCourseBin(html: string) {
    try {
        let courses = {}
        $(html)
            .find("div.accordion-content-area")
            .each(function () {
                const course: string = $(this).attr("id").split("_")[1]
                $(this)
                    .find("div.section-table")
                    .each(function () {
                        $(this)
                            .find("div.section")
                            .each(function () {
                                $(this)
                                    .find(
                                        "div.dvSRtxt[style*='display: block']"
                                    )
                                    .each(function () {
                                        var id = $(this).attr("id")
                                        var parts = id.split("_")
                                        if (parts[1] === "regY") {
                                            const parent =
                                                $(this).parents(
                                                    "div.section_crsbin"
                                                )
                                            const time = parent
                                                .find(
                                                    "span:has(> span:contains('Time:'))"
                                                )
                                                .find(
                                                    "span:not(:contains('Time:'))"
                                                )
                                                .text()
                                                .trim()
                                                .split("-")

                                            const days = parent
                                                .find(
                                                    "span:has(> span:contains('Days:'))"
                                                )
                                                .find(
                                                    "span:not(:contains('Days:'))"
                                                )
                                                .text()
                                                .trim()

                                            const professor = parent
                                                .find(
                                                    "span:has(> span:contains('Instructor:'))"
                                                )
                                                .find(
                                                    "span:not(:contains('Instructor:'))"
                                                )
                                                .text()
                                                .trim()

                                            const type = parent
                                                .find(
                                                    "span.course-section-mixed, span.course-section-lecture"
                                                )
                                                .text()
                                                .trim()
                                                .replace(/^Type:|\s+/g, "")

                                            // stored as [course, days, start, end, professor, session]
                                            courses[parts[3]] = [
                                                course,
                                                days,
                                                timeToMins(time[0]),
                                                timeToMins(time[1]),
                                                professor,
                                                type.length > 0 ? true : false
                                            ]
                                        }
                                    })
                            })
                    })
            })
        const storageManager = new StorageManager()
        await storageManager.set("registeredCourses", courses)
        console.log("COURSES:", courses)
        await storageManager.set("registeredCoursesCached", true)

        return courses
    } catch (error) {
        return { error: error.toString() }
    }
}
