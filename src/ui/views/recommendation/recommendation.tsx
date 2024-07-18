import { Button, ScrollArea, Text, TextInput } from "@mantine/core"
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
        setCourses([...courses, ""])
        setErrors([...errors, ""]) 
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
            const newErrors = [...errors]
            newErrors[index] = "Invalid Course Format"
            setErrors(newErrors)
            return false
        }
        try {
            const isValid = await recommendationManager.validateCourse(course)
            if (!isValid) {
                const newErrors = [...errors]
                newErrors[index] = "Course Not Found"
                setErrors(newErrors)
                return false
            }
        } catch (error) {
            const newErrors = [...errors]
            newErrors[index] = "Error validating course"
            setErrors(newErrors)
            return false
        }
        return true
    }

    const handleSubmit = async () => {
        const newErrors = [...errors]
        let allValid = true
        for (const [index, course] of courses.entries()) {
            const isValid = await validateCourse(course, index)
            if (!isValid) {
                allValid = false
            }
        }
        if (!allValid) {
            return
        }
        setLoading(true)
        try {
            await recommendationManager.createSchedule(courses)
        } catch (error) {
            setErrors(["Invalid Course"])
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
                    <Text fw={500} ta="center">
                        Enter your desired courses.
                    </Text>
                    <div>
                        {courses.map((course, index) => (
                            <div key={index}>
                                <TextInput
                                    variant="filled"
                                    radius="md"
                                    error={errors[index]}
                                    placeholder={`BIO-${100 + index}`}
                                    value={course}
                                    onChange={(event) =>
                                        handleCourseChange(
                                            index,
                                            event.currentTarget.value
                                        )
                                    }
                                />
                                <Button
                                    variant="light"
                                    color="red"
                                    size="md"
                                    className={style.removeButton}
                                    onClick={() => removeCourse(index)}>
                                    Remove Course
                                </Button>
                            </div>
                        ))}
                        <button onClick={addCourse}>Add Course</button>
                    </div>
                    <div className={sharedStyles.button}>
                        <Button
                            variant="light"
                            color="red"
                            size="md"
                            onClick={handleSubmit}>
                            Create Schedule
                        </Button>
                    </div>
                </>
            )}
        </ScrollArea.Autosize>
    )
}
