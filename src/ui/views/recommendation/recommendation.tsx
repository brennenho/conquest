import { Button, CloseButton, ScrollArea, Text, TextInput } from "@mantine/core"
import cn from "classnames"
import React, { useEffect, useState } from "react"

import { RecommendationManager } from "~backend/managers/recommendation"
import { Course } from "~ui/components"
import sharedStyles from "~ui/sharedStyles.module.scss"

import style from "./recommend.module.scss"

const cleanName = (name: string): string => {
    return name.replace(/{|}/g, "").trim()
}
export const RecommendationView: React.FC = () => {
    const [errors, setErrors] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const recommendationManager = new RecommendationManager()
    const [courses, setCourses] = useState<string[]>(["", "", "", ""])
    const [schedules, setSchedules] = useState<
        Array<Array<string>> | undefined
    >(undefined)
    const [scheduleIndex, setScheduleIndex] = useState<number>(0)
    const [courseData, setCourseData] = useState<Array<any>>([])

    const handleCourseChange = (index: number, value: string) => {
        const newCourses = [...courses]
        newCourses[index] = value
        setCourses(newCourses)

        const newErrors = [...errors]
        newErrors[index] = ""
        setErrors(newErrors)
    }

    const addCourse = () => {
        if (courses.length < 5) {
            setCourses([...courses, ""])
            setErrors([...errors, ""])
        }
    }

    const removeCourse = (index: number) => {
        const newCourses = courses.filter((_, i) => i !== index)
        setCourses(newCourses)

        const newErrors = errors.filter((_, i) => i !== index)
        setErrors(newErrors)
    }

    const validateCourse = async (course: string) => {
        const pattern = /^[A-Za-z]{2,4}-\d{3,4}$/
        if (!pattern.test(course)) {
            return false
        }
        try {
            const isValid = await recommendationManager.validateCourse(course)
            if (!isValid) {
                return false
            }
        } catch (error) {
            return false
        }
        return true
    }

    const handleSubmit = async () => {
        const newErrors = [...errors]
        let allValid = true

        for (const [index, course] of courses.entries()) {
            const isValid = await validateCourse(course)
            if (!isValid) {
                allValid = false
                newErrors[index] = `Invalid Input`
            }
        }

        setErrors(newErrors)

        if (!allValid) {
            return
        }

        setLoading(true)
        try {
            setSchedules(await recommendationManager.createSchedule(courses))
        } catch (error) {
            setErrors(["Error creating schedule"])
        } finally {
            setLoading(false)
        }
    }
    const nextSchedule = () => {
        setScheduleIndex((scheduleIndex + 1) % schedules.length)
    }
    const previousSchedule = () => {
        setScheduleIndex(
            scheduleIndex - 1 < 0 ? schedules.length - 1 : scheduleIndex - 1
        )
    }
    const clear = () => {
        setErrors([])
        setLoading(false)
        setCourses(["", "", "", ""])
        setSchedules(undefined)
        setScheduleIndex(0)
        setCourseData([])
    }

    useEffect(() => {
        const fetchCourseData = async () => {
            if (schedules && schedules[scheduleIndex]) {
                const data = await Promise.all(
                    schedules[scheduleIndex].map(async (course) => {
                        const result =
                            await recommendationManager.searchBySectionID(
                                course
                            )
                        return result
                    })
                )
                setCourseData(data)
            }
        }

        fetchCourseData()
    }, [schedules, scheduleIndex])

    return (
        <ScrollArea.Autosize mah={345} type="auto" scrollbarSize={6}>
            {schedules && schedules.length > 0 ? (
                <div className={sharedStyles.flexColumn}>
                    {courseData.map((course, index) => {
                        let professorName = cleanName(
                            `${course[3]} ${course[4]}`
                        )
                        if (course[8] !== "Lec") {
                            professorName = cleanName(course[8])
                        }
                        return (
                            <ScrollArea.Autosize
                                mah={345}
                                type="auto"
                                scrollbarSize={6}>
                                <div key={index}>
                                    <Course
                                        name={cleanName(course[2])}
                                        professor={
                                            professorName !== ""
                                                ? professorName
                                                : null
                                        }
                                        days={cleanName(course[7])}
                                        startTime={course[5]}
                                        endTime={course[6]}
                                    />
                                </div>
                            </ScrollArea.Autosize>
                        )
                    })}
                    <div className={sharedStyles.flexRow}>
                        <div className={cn(style.button)}>
                            <Button
                                variant="light"
                                color="black"
                                size="sm"
                                className={sharedStyles.margin5}
                                onClick={previousSchedule}>
                                <Text fw={700} size="xs" ta="center">
                                    Prev
                                </Text>
                            </Button>
                            <Button
                                variant="light"
                                color="black"
                                size="sm"
                                className={sharedStyles.margin5}
                                onClick={clear}>
                                <Text fw={700} size="xs" ta="center">
                                    Exit
                                </Text>
                            </Button>
                            <Button
                                variant="light"
                                color="black"
                                size="sm"
                                className={sharedStyles.margin5}
                                onClick={nextSchedule}>
                                <Text fw={700} size="xs" ta="center">
                                    Next
                                </Text>
                            </Button>
                        </div>
                    </div>
                    <Text fw={700} size="xs" ta="center">
                        {scheduleIndex + 1}/{schedules.length}
                    </Text>
                </div>
            ) : loading ? (
                <div className={style.loadingscreen}>
                    <div className={style.spinner}></div>
                </div>
            ) : (
                <>
                    <Text
                        size="xs"
                        fw={700}
                        ta="center"
                        className={sharedStyles.margin10}>
                        Enter desired courses
                    </Text>
                    <div className={sharedStyles.flexColumn}>
                        {courses.map((course, index) => (
                            <div
                                key={index}
                                className={cn(
                                    sharedStyles.flexCenter,
                                    sharedStyles.margin5
                                )}>
                                <TextInput
                                    variant="filled"
                                    radius="md"
                                    {...(errors[index] ? { error: true } : {})}
                                    placeholder={`BIO-${100 + index}`}
                                    maxLength={9}
                                    value={course}
                                    onChange={(event) =>
                                        handleCourseChange(
                                            index,
                                            event.currentTarget.value
                                        )
                                    }
                                />
                                <CloseButton
                                    onClick={() => removeCourse(index)}
                                />
                            </div>
                        ))}
                        {courses.length < 5 && (
                            <Button
                                variant="light"
                                color="blue"
                                className={style.button}
                                onClick={addCourse}>
                                <Text fw={700} size="xs">
                                    + Course
                                </Text>
                            </Button>
                        )}
                        <div className={cn(style.button, style.submitButton)}>
                            <Button
                                variant="light"
                                color="black"
                                size="sm"
                                onClick={handleSubmit}>
                                <Text fw={700} size="xs" ta="center">
                                    Create Schedule
                                </Text>
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </ScrollArea.Autosize>
    )
}
