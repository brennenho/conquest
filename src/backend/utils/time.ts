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

/**
 * Convert minutes from midnight to time string
 * @param mins (from midnight)
 * @returns time string in format "hh:mm (am/pm)"
 */
export function minsToTime(mins: number): string {
    let hours = Math.floor(mins / 60)
    const minutes = mins % 60

    const period = hours >= 12 ? "PM" : "AM"

    hours = hours % 12
    hours = hours === 0 ? 12 : hours

    const formattedMinutes = minutes.toString().padStart(2, "0")

    return `${hours}:${formattedMinutes} ${period}`
}

/**
 * Converts a military time string to a 12-hour time string
 * @param militaryTime (string) - military time string in format "hh:mm"
 * @returns 12-hour time string in format "hh:mm (am/pm)"
 */
export function militaryToStandard(militaryTime: string): string {
    const [hours, minutes] = militaryTime.split(":")
    const hoursInt = parseInt(hours, 10)
    let hours12 = hoursInt % 12
    const period = hoursInt >= 12 ? "PM" : "AM"
    hours12 = hours12 === 0 ? 12 : hours12
    const formattedMinutes = minutes.padStart(2, "0")
    return `${hours12}:${formattedMinutes} ${period}`
}

/**
 * Converts a string of days to a bitmask
 * @param days
 * @returns bitmask
 */
export function daysToBitmask(days: string) {
    const daysMap = {
        M: 1 << 0,
        T: 1 << 1,
        W: 1 << 2,
        Th: 1 << 3,
        F: 1 << 4
    }
    let bitmask = 0
    for (let i = 0; i < days.length; i++) {
        if (days[i] === "T" && i + 1 < days.length && days[i + 1] === "h") {
            bitmask |= daysMap["Th"]
            i++
        } else {
            bitmask |= daysMap[days[i]]
        }
    }
    return bitmask
}

/**
 * Checks if a given course overlaps with any registered courses
 * @param days
 * @param startTime
 * @param endTime
 * @param courses
 * @returns course name if overlap, null otherwise
 */
export function overlaps(
    days: string,
    startTime: string,
    endTime: string,
    courses
) {
    try {
        if (!days || !startTime || !endTime || !courses) {
            return null
        }
        const newDaysBitmask = daysToBitmask(days)
        const newStartTime = timeToMins(startTime)
        const newEndTime = timeToMins(endTime)

        for (const section in courses) {
            const course = courses[section]
            const existingDaysBitmask = daysToBitmask(course[1])
            const existingStartTime = course[2]
            const existingEndTime = course[3]

            if ((newDaysBitmask & existingDaysBitmask) !== 0) {
                // Overlapping days
                if (
                    !(
                        newEndTime <= existingStartTime ||
                        newStartTime >= existingEndTime
                    )
                ) {
                    return course[0]
                }
            }
        }
    } catch (e) {
        console.log("Error checking for overlap: ", e)
    }
    return null
}
