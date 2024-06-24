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
            const existingDaysBitmask = course[1]
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
        console.error(e)
    }
    return null
}
