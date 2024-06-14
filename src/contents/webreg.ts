import $ from "jquery"
import type { PlasmoCSConfig } from "plasmo"

import * as Courses from "../scripts/courses"

// import * as Parse from "../scripts/parse"

export const config: PlasmoCSConfig = {
    matches: ["https://webreg.usc.edu/*"]
}

$(document).ready(function () {
    Courses.parse()
})
