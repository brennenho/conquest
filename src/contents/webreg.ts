import $ from "jquery"
import type { PlasmoCSConfig } from "plasmo"

import { StorageManager } from "~backend/managers"
import { parseCourseBin } from "~backend/parsers/courseBin"
import { COURSE_BIN_URL } from "~constants"

export const config: PlasmoCSConfig = {
    matches: ["https://webreg.usc.edu/*"],
    exclude_matches: [
        "https://webreg.usc.edu/Checkout*",
        "https://webreg.usc.edu/Courses*"
    ]
}

$(document).ready(async function () {
    const storageManager = new StorageManager()
    const updated = await storageManager.get("registeredCoursesCached")
    console.log("UPDATED: ", updated)
    if (!updated) {
        const html = await fetch(COURSE_BIN_URL)
        await parseCourseBin(await html.text())
    }
})
