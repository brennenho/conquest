import { ScrollArea } from "@mantine/core"
import React, { useEffect, useState } from "react"

import { StorageManager } from "~backend/managers"
import { minsToTime } from "~backend/utils"
import { Course } from "~ui/components"

export const CoursesView: React.FC = () => {
    const [mappedCourses, setMappedCourses] = useState<{ [key: string]: any }>(
        {}
    )

    useEffect(() => {
        const storageManager = new StorageManager()
        const getCourses = async () => {
            const courses: { [key: string]: any } =
                await storageManager.get("registeredCourses")

            const newMappedCourses: { [key: string]: any } = {}
            Object.entries(courses).forEach(([sectionId, sectionDetails]) => {
                const [
                    className,
                    days,
                    startTime,
                    endTime,
                    professor,
                    isLecture
                ] = sectionDetails

                const sectionData = {
                    sectionId,
                    className,
                    days,
                    startTime: minsToTime(startTime),
                    endTime: minsToTime(endTime),
                    professor,
                    isLecture
                }

                if (!newMappedCourses[className]) {
                    newMappedCourses[className] = {
                        lecture: null,
                        sections: []
                    }
                }

                if (isLecture) {
                    newMappedCourses[className].lecture = sectionData
                } else {
                    newMappedCourses[className].sections.push(sectionData)
                }
            })
            setMappedCourses(newMappedCourses)
        }
        getCourses()
    }, [])

    return (
        <ScrollArea h={350} type="auto" scrollbarSize={6}>
            {Object.values(mappedCourses).map((course) => (
                <>
                    {course.lecture && (
                        <Course
                            key={course.lecture.sectionId}
                            name={course.lecture.className}
                            professor={course.lecture.professor}
                            days={course.lecture.days}
                            startTime={course.lecture.startTime}
                            endTime={course.lecture.endTime}
                        />
                    )}
                </>
            ))}
        </ScrollArea>
    )
}
