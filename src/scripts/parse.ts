import $ from "jquery"

/**
 * Finds all `<span>` elements that contain a child `<span>` with the specified text and applies a given function to each.
 *
 * @param text The text to search for within child `<span>` elements.
 * @param func A function to apply to each parent `<span>` element that contains a child `<span>` with the specified text.
 *             The function receives the jQuery object of the parent `<span>` as its argument.
 */
export function findSpansWithText(
  parent: string,
  text: string,
  func: (element: $<HTMLElement>) => void
) {
  $("span:has(> span:contains('" + text + "'))", parent).each(function () {
    func($(this))
  })
}

export function findCourseDivs(func: (element: $<HTMLElement>) => void) {
  $("div.course-header").each(function () {
    func($(this))
  })
}
