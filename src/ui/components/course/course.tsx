import { Avatar, Text } from "@mantine/core"
import { IconSchool } from "@tabler/icons-react"
import React from "react"

import { courseIcons } from "~backend/utils"

import style from "./course.module.scss"

interface CourseProps {
    name: string
    professor: string
    days: string
    startTime: string
    endTime: string
}

export const Course: React.FC<CourseProps> = ({
    name,
    professor,
    days,
    startTime,
    endTime
}) => {
    const { Icon, color } = courseIcons[name.split("-")[0]] || {
        Icon: IconSchool,
        color: "gray"
    }
    return (
        <div className={style.container}>
            <div className={style.info}>
                {/* White icons are a different variant */}
                {color !== "white" ? (
                    <Avatar
                        color={color}
                        radius="xl"
                        variant="filled"
                        size="md">
                        <Icon size="1.5rem" />
                    </Avatar>
                ) : (
                    <Avatar
                        color={"black"}
                        radius="xl"
                        variant="white"
                        size="md">
                        <Icon size="1.5rem" />
                    </Avatar>
                )}
                <div className={style.name}>
                    <Text fw={700} tt="uppercase">
                        {name}
                    </Text>
                    <Text fw={500} size="xs">
                        {professor}
                    </Text>
                </div>
            </div>
            <div className={style.details}>
                <Text
                    fw={700}
                    size="xs"
                    fs="italic"
                    ta="right"
                    className={style.text}>
                    {days}
                </Text>
                <Text size="xs" ta="right" className={style.text}>
                    {startTime}
                    <br />
                    {endTime}
                </Text>
            </div>
        </div>
    )
}
