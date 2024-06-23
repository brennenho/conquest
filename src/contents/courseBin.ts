import $ from "jquery"
import type { PlasmoCSConfig } from "plasmo"

import { parseCourseBin } from "~backend/parsers/courseBin"

export const config: PlasmoCSConfig = {
    matches: ["https://webreg.usc.edu/CourseBin*"]
}

$(document).ready(async function () {
    let courses = {}
    courses = await parseCourseBin(document.documentElement.innerHTML)
})
