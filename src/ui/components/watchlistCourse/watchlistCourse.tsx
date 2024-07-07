import { Avatar, Button, Modal, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconSchool } from "@tabler/icons-react"
import React from "react"

import { WatchlistManager } from "~backend/managers"
import { courseIcons } from "~backend/utils"

import style from "./watchlistCourse.module.scss"

interface WatchlistCourseProps {
    name: string
    professor: string
    days: string
    startTime: string
    endTime: string
    sectionId: string
    type: string
    handleReload: () => void
}

export const WatchlistCourse: React.FC<WatchlistCourseProps> = ({
    name,
    professor,
    days,
    startTime,
    endTime,
    sectionId,
    type,
    handleReload
}) => {
    const [opened, { open, close }] = useDisclosure(false)
    const { Icon, color } = courseIcons[name.split("-")[0]] || {
        Icon: IconSchool,
        color: "gray"
    }

    const handleRemove = async () => {
        close()
        await new WatchlistManager().removeFromWatchlistFromPopup(sectionId)
        handleReload()
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                centered
                withCloseButton={false}
                className={style.modal}
                size="75%">
                {
                    <div className={style.remove}>
                        <Button
                            variant="light"
                            color="red"
                            size="sm"
                            fullWidth
                            onClick={handleRemove}>
                            Remove
                        </Button>
                        <Button
                            variant="light"
                            color="gray"
                            size="sm"
                            fullWidth
                            onClick={close}>
                            Cancel
                        </Button>
                    </div>
                }
            </Modal>
            <div className={style.container} onClick={open}>
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
                        <Text fw={700} tt="uppercase" size="xs">
                            {name}
                        </Text>
                        <Text fw={500} size="xs">
                            {professor}
                        </Text>
                        <Text fw={500} size="xs">
                            {sectionId + ` (${type})`}
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
        </>
    )
}
