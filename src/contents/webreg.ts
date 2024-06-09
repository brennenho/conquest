import $ from "jquery"
import type { PlasmoCSConfig } from "plasmo"

import * as Formatting from "../scripts/formatting"

// import * as Parse from "../scripts/parse"

export const config: PlasmoCSConfig = {
  matches: ["https://webreg.usc.edu/*"]
}

$(document).ready(function () {
  Formatting.courseInfo()
})
