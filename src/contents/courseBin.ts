import $ from "jquery"
import type { PlasmoCSConfig } from "plasmo"

import { sendToBackground } from "@plasmohq/messaging"

export const config: PlasmoCSConfig = {
    matches: ["https://webreg.usc.edu/CourseBin*"]
}

$(document).ready(async function () {
    // Send a message to the background script to update the courses
    const registeredCourses = await sendToBackground({
        name: "updateCourses",
        body: { useCache: false },
        extensionId: process.env.PLASMO_PUBLIC_EXTENSION_ID
    })
})
