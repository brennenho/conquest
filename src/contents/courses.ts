import $ from "jquery"
import type { PlasmoCSConfig } from "plasmo"

import { Storage } from "@plasmohq/storage"

import { StorageManager } from "~/backend/managers"
import * as Constants from "~/constants"
import { COURSE_BIN_URL } from "~/constants"
import appendWatchlistButton from "~/ui/components/watchlistButton"
import appendStarRating from "~ui/components/starRating"
import { WatchlistManager, RatingManager} from "~backend/managers"
import { parseCourseBin } from "~backend/parsers/courseBin"
import { overlaps } from "~backend/utils"

export const config: PlasmoCSConfig = {
    matches: ["https://webreg.usc.edu/Courses*"]
}

const storage = new Storage()
storage.watch({
    watchlistCached: (c) => {
        window.location.reload()
    }
})

$(document).ready(async function () {
    let courses = {}
    const storageManager = new StorageManager()
    const updated = await storageManager.get("registeredCoursesCached")
    if (updated) {
        // Get cached courses
        courses = await storageManager.get("registeredCourses")
    } else {
        const html = await fetch(COURSE_BIN_URL)
        courses = await parseCourseBin(await html.text())
    }
    if (!(await storageManager.get("watchlistCached"))) {
        await new WatchlistManager().getWatchlist()
    }
    const department = $("h3").text().trim()
    /**
     * Parse course page and extract course capacity information.
     * Apply color formatting and insert elements as needed.
     * Add rate my professor rating in the form of stars
     */
    $("div.course-header").each(function () {
        var numRegistered: number = 0
        var numTotal: number = 0
        var units: number = 0
        var noOverlap: boolean = false

        const id: string = $(this).attr("href")
        const row = $(id)
            .find("div.section-table")
            .find("div.section")
            .find("div.section-row")
        $(row).each(function () {
            $(this)
                .find("span:has(> span:contains('Registered:'))")
                .find("span:not(:contains('Registered:'))")
                .each(function () {
                    const text = $(this)
                        .text()
                        .match(/(\d+) of (\d+)/)
                    const parent = $(this).parents("div.section_crsbin")
                    const sectionId = parent
                        .find("span:has(> span:contains('Section:'))")
                        .find("b")
                        .text()
                        .replace(/\s/g, "")
                        .substring(0, 5)
                    const time = parent
                        .find("span:has(> span:contains('Time:'))")
                        .find("span:not(:contains('Time:'))")
                        .text()
                        .trim()
                        .split("-")
                    const days = parent
                        .find("span:has(> span:contains('Days:'))")
                        .find("span:not(:contains('Days:'))")
                        .text()
                        .trim()

                    if (sectionId in courses) {
                        parent
                            .parent()
                            .css("background-color", Constants.BACKGROUND_GREEN)
                    } else {
                        const overlap = overlaps(
                            days,
                            time[0],
                            time[1],
                            courses
                        )
                        if (overlap) {
                            parent
                                .parent()
                                .css(
                                    "background-color",
                                    Constants.BACKGROUND_ORANGE
                                )
                            const button = parent
                                .find("div.btnAddToMyCourseBin")
                                .find("button")
                            button.text(`Overlaps ${overlap}`)
                            button.hover(
                                function () {
                                    $(this).text("Add anyway")
                                },
                                function () {
                                    $(this).text(`Overlaps ${overlap}`)
                                }
                            )
                        } else {
                            noOverlap = true
                        }
                    }
                    if (text) {
                        const registered: number = parseInt(text[1], 10)
                        const total: number = parseInt(text[2], 10)

                        if (
                            parent.find("span." + Constants.CLASS_LECTURE)
                                .length > 0 ||
                            parent.find("span." + Constants.CLASS_MIXED)
                                .length > 0
                        ) {
                            numRegistered += registered
                            numTotal += total
                        }
                        if (registered / total > 0.9) {
                            $(this).css("color", Constants.RED)
                        } else if (registered / total > 0.75) {
                            $(this).css("color", Constants.ORANGE)
                        } else {
                            $(this).css("color", Constants.GREEN)
                        }
                    } else {
                        appendWatchlistButton(
                            $(parent).find("div.btnAddToMyCourseBin")[0],
                            sectionId,
                            id.substring(id.indexOf("_") + 1, id.indexOf("-"))
                        )
                    }
                })
        })
        $(row).each(async function (){
            $(this)
                .find("span:has(> span:contains('Registered:'))")
                .find("span:not(:contains('Registered:'))")
                .each(async function () {
                    const parent = $(this).parents("div.section_crsbin")
                    const ratingManager = new RatingManager()
                    const professor = parent.find("span:has(> span:contains('Instructor:'))")
                    .find("span:not(:contains('Instructor:'))")
                    .text()
                    .trim()
                    if (professor)
                        {
                            const last_name = professor.substring(0, professor.indexOf(','))
                            const first_name = professor.substring(professor.indexOf(',')+2)
                            const data = await ratingManager.getProfessor(first_name, last_name, department)
                            appendStarRating($(parent).find("span:has(> span:contains('Instructor:'))")[0], data)    
                        }
                })
        })  
        $(row)
            .find("span:has(> span:contains('Units:'))")
            .each(function () {
                const text = $(this)
                    .text()
                    .match(/Units:\s*(\d+\.\d+(-\d+\.\d+)?)/)

                const parent = $(this).parents("div.section_crsbin")
                if (
                    parent.find("span." + Constants.CLASS_LECTURE).length > 0 ||
                    parent.find("span." + Constants.CLASS_MIXED).length > 0
                ) {
                    units = text[1]
                }
            })
        const titleText = $(this).find("span.crsTitl")
        if (numRegistered == numTotal) {
            titleText.html(function (index, current) {
                return current + " | " + units + " units | FULL"
            })
            $(this).css("background-color", Constants.BACKGROUND_RED)
        } else {
            if (!noOverlap) {
                $(this).css("background-color", Constants.BACKGROUND_ORANGE)
            }

            $(this)
                .find("span.crsTitl")
                .text(function (index, current) {
                    return (
                        current +
                        " | " +
                        units +
                        " units | " +
                        numRegistered +
                        " / " +
                        numTotal
                    )
                })
        }
    })
})
