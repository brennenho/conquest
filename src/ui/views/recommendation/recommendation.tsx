import { Button, CloseButton, ScrollArea, Text, TextInput } from "@mantine/core"
import cn from "classnames"
import React, { useState } from "react"

import { RecommendationManager } from "~backend/managers/recommendation"
import sharedStyles from "~ui/sharedStyles.module.scss"

import style from "./recommend.module.scss"

export const RecommendationView: React.FC = () => {
    const [errors, setErrors] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const recommendationManager = new RecommendationManager()
    const [courses, setCourses] = useState<string[]>([""])
    const [schedules, setSchedules] = useState<string[]>()

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

    const validateCourse = async (course: string, index: number) => {
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
        const newErrors = Array(courses.length).fill("")
        let allValid = true

        for (const [index, course] of courses.entries()) {
            const isValid = await validateCourse(course, index)
            if (!isValid) {
                allValid = false
                newErrors[index] = `Invalid input`
            }
        }

        setErrors(newErrors)

        if (!allValid) {
            return
        }

        setLoading(true)
        try {
            await recommendationManager.createSchedule(courses)
        } catch (error) {
            setErrors(["Error creating schedule"])
        } finally {
            setLoading(false)
        }
    }

    return (
        <ScrollArea.Autosize mah={345} type="auto" scrollbarSize={6}>
            {loading ? (
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
                        Enter your planned courses
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
                                    error={errors[index]}
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
