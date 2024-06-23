import $ from "jquery"

import { StorageManager } from "../managers"
import { timeToMins } from "../utils"

export async function parseCourseBin(html: string) {
    try {
        let courses = {}
        console.log("PARSING COURSE BIN")
        $(html)
            .find("div.section-table")
            .each(function () {
                $(this)
                    .find("div.section")
                    .each(function () {
                        $(this)
                            .find("div.dvSRtxt[style*='display: block']")
                            .each(function () {
                                var id = $(this).attr("id")
                                var parts = id.split("_")
                                if (parts[1] === "regY") {
                                    const time = $(this)
                                        .parents("div.section_crsbin")
                                        .find(
                                            "span:has(> span:contains('Time:'))"
                                        )
                                        .find("span:not(:contains('Time:'))")
                                        .text()
                                        .trim()
                                        .split("-")
                                    courses[parts[3]] = [
                                        timeToMins(time[0]),
                                        timeToMins(time[1])
                                    ]
                                }
                            })
                    })
            })
        const storageManager = new StorageManager()
        await storageManager.set("registeredCourses", courses)
        await storageManager.set("registeredCoursesCached", true)

        return courses
    } catch (error) {
        return { error: error.toString() }
    }
}
