import { load } from "cheerio"

import type { PlasmoMessaging } from "@plasmohq/messaging"

import { StorageManager } from "~backend/managers"
import { timeToMins } from "~backend/utils"
import { COURSE_BIN_URL } from "~constants"

/**
 * Scrapes the CourseBin page.
 * Extracts the start and end times of each registered section.
 * @param req
 * @param res
 */
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    if (req.body.useCache) {
        const updated = await new StorageManager().get(
            "registeredCoursesCached"
        )
        if (updated) {
            // Get cached courses
            const courses = await new StorageManager().get("registeredCourses")
            res.send({ success: true, courses: courses })
            return
        }
    }
    try {
        // Get HTML of the CourseBin page
        const response = await fetch(COURSE_BIN_URL)
        const html = await response.text()
        const $ = load(html)
        let courses = {}

        // Parse HTML with Cheerio
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

        // Cache registered couurses
        const storageManager = new StorageManager()
        storageManager.set("registeredCourses", courses)
        storageManager.set("registeredCoursesCached", true)

        res.send({ success: true, courses: courses })
    } catch (error) {
        res.send({ success: false, error: error.toString() })
    }
}

export default handler
