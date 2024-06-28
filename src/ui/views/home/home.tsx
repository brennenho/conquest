import { Button, ScrollArea, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import React, { useState } from "react"

import { courseIcons } from "~backend/utils"
import { Course, Header } from "~ui/components"
import { Menu } from "~ui/views"

import { CoursesView } from "../courses/courses"
import style from "./home.module.scss"

interface HomeViewProps {
    email: string
    handleLogout: () => void
}

export const HomeView: React.FC<HomeViewProps> = ({ email, handleLogout }) => {
    const [menuOpened, { toggle }] = useDisclosure()
    const [view, setView] = useState<string>("home")

    return (
        <div>
            <Header menuOpened={menuOpened} onClick={toggle} />
            <Menu
                email={email}
                menuOpened={menuOpened}
                toggleMenu={toggle}
                setCurrentView={setView}
                handleLogout={handleLogout}
            />
            {view === "home" && (
                <>
                    <CoursesView />
                </>
            )}
            {view === "about" && (
                <ScrollArea h={350} type="auto" scrollbarSize={6}>
                    {Object.entries(courseIcons).map(
                        ([key, { Icon, color }]) => (
                            <Course
                                key={key}
                                name={key}
                                professor={"Professor"}
                                school={"temp"}
                                days={"MWF"}
                                startTime={"8:00 AM"}
                                endTime={"9:00 AM"}
                            />
                        )
                    )}
                </ScrollArea>
            )}
        </div>
    )
}
