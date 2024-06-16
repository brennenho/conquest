import $ from "jquery"

import * as Constants from "../../constants"
import appendWatchlistButton from "../../ui/components/watchlistButton"

export async function parse() {
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
          const parent = $(this).parents("div.section_crsbin")
          if (text) {
            const registered: number = parseInt(text[1], 10)
            const total: number = parseInt(text[2], 10)

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
          } else {
            const sectionId = parent
              .find("span:has(> span:contains('Section:'))")
              .find("b")
              .text()
              .replace(/\s/g, "")
            appendWatchlistButton(
              $(parent).find("div.btnAddToMyCourseBin")[0],
              sectionId,
              id.substring(id.indexOf("_") + 1, id.indexOf("-"))
            )
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
