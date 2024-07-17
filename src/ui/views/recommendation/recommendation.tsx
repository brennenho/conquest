import { Button, FocusTrap, ScrollArea, Text, TextInput } from "@mantine/core"
import React, { useEffect, useState } from "react"

import { RecommendationManager } from "~backend/managers/recommendation"
import sharedStyles from "~ui/sharedStyles.module.scss"

import style from "./recommend.module.scss"

export const RecommendationView: React.FC = () => {
    const [error, setError] = useState<string>("")
    const recommendationManager = new RecommendationManager()
    const [courses, setCourses] = useState<string[]>([""])

    const handleCourseChange = (index: number, value: string) => {
        const newCourses = [...courses]
        newCourses[index] = value
        setCourses(newCourses)
    }

    const addCourse = () => {
        setCourses([...courses, ""])
    }

    const removeCourse = (index: number) => {
        const newCourses = courses.filter((_, i) => i !== index)
        setCourses(newCourses)
    }
    const validateCourse = (course: string) => {
        const pattern = /^[A-Za-z]{3,4}-\d{3,4}$/
        if (!pattern.test(course)){
            setError("Invalid Course Format")
            return false
        }
        if (!recommendationManager.validateCourse(course)){
            setError("Course Not Found")
            return false
        }
        return true

    }
    const handleSumbit = async () => {
        for (const course of courses) {
            if (!validateCourse(course)) {
                setError(`Error finding a course matching ${course}`);    
                return false;
            }
        }
        const schedule = await recommendationManager.createSchedule(courses)
        return schedule
    }
    return (
        <ScrollArea.Autosize mah={345} type="auto" scrollbarSize={6}>
            <Text fw={500} ta="center">
                Enter your desired courses.
            </Text>
            <div>
                {courses.map((course, index) => (
                    <div key={index}>
                        <TextInput
                            variant="filled"
                            radius="md"
                            error={error}
                            placeholder={`Course ${index + 1}`}
                            value={course}
                            onChange={(event) => {
                                handleCourseChange(
                                    index,
                                    event.currentTarget.value
                                )
                                setError("")
                            }}
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
                    onClick={handleSumbit}>
                    Create Schedule
                </Button>
            </div>
        </ScrollArea.Autosize>
    )
}
