import { Button, ScrollArea, Text } from "@mantine/core"
import React, { useEffect, useState } from "react"

import { StorageManager } from "~backend/managers"
import { minsToTime } from "~backend/utils"
import { Course } from "~ui/components"
import sharedStyles from "~ui/sharedStyles.module.scss"

export const CoursesView: React.FC = () => {
    const [mappedCourses, setMappedCourses] = useState<{ [key: string]: any }>(
        {}
    )

    useEffect(() => {
        const storageManager = new StorageManager()
        const getCourses = async () => {
            const courses: { [key: string]: any } =
                await storageManager.get("registeredCourses")

            // Restructure course data for easier rendering
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
            {Object.keys(mappedCourses).length === 0 ? (
                <>
                    <Text
                        size="sm"
                        fw={700}
                        ta="center"
                        className={sharedStyles.margin10}>
                        Please sign into webreg to load your registered courses.
                    </Text>
                    <div className={sharedStyles.button}>
                        <Button
                            variant="light"
                            color="red"
                            size="sm"
                            fullWidth
                            onClick={() =>
                                window.open("https://my.usc.edu", "_blank")
                            }>
                            Open myUSC
                        </Button>
                    </div>
                </>
            ) : (
                Object.values(mappedCourses).map((course, index) => (
                    <React.Fragment key={index}>
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
                    </React.Fragment>
                ))
            )}
        </ScrollArea>
    )
}
