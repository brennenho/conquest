/**
 * Converts a time string to minutes from midnight
 * @param time (string) - time string in format "hh:mm(am/pm)"
 * @returns minutes from midnight (number)
 */
export function timeToMins(time: string): number {
    // Extract hours, minutes, and am/pm from string
    const [_, hours, minutes, period] = time.match(/(\d+):(\d+)(am|pm)/i)

    // Convert to 24-hour format
    let hours24 = parseInt(hours, 10) % 12
    if (period.toLowerCase() === "pm") {
        hours24 += 12
    }
    // Calculate total minutes from midnight
    return hours24 * 60 + parseInt(minutes, 10)
}
