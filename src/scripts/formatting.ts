import $ from "jquery"

import * as Constants from "../constants"

/**
 * Updates the display of course info.
 *
 * This function iterates over each course header and performs the following actions:
 * - Extracts the number of registered students and total capacity for each course section.
 * - Updates the color of the registration numbers based on the percentage of capacity filled:
 *   - Red if more than 90% filled.
 *   - Orange if more than 75% filled.
 *   - Green otherwise.
 * - Extracts the number of units for the course.
 * - Updates the course header to include the number of units and, if the course is full, marks it as "FULL".
 *   Otherwise, it displays the number of registered students out of the total capacity.
 * - Changes the background color of the course header based on the percentage of capacity filled:
 *   - Red background if the course is full.
 *
 * It relies on specific HTML structure and CSS classes to identify and update the elements,
 * and uses constants for color and background color values.
 */

export function courseInfo() {
  $("div.course-header").each(function () {
    var numRegistered: number = 0
    var numTotal: number = 0
    var units: number = 0

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
          if (text) {
            const registered: number = parseInt(text[1], 10)
            const total: number = parseInt(text[2], 10)
            const parent = $(this).parents("div.section_crsbin")
            if (
              parent.find("span." + Constants.CLASS_LECTURE).length > 0 ||
              parent.find("span." + Constants.CLASS_MIXED).length > 0
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
          }
        })
    })
    $(row)
      .find("span:has(> span:contains('Units:'))")
      .each(function () {
        const text = $(this)
          .text()
          .match(/Units:\s*(\d+\.\d+)/)
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
}
