import $ from "jquery"
import type { PlasmoCSConfig } from "plasmo"

import { parseCourseBin } from "~backend/parsers/courseBin"

export const config: PlasmoCSConfig = {
    matches: ["https://webreg.usc.edu/Checkout*"]
}

$(document).ready(async function () {
    await parseCourseBin(document.documentElement.innerHTML)
})
