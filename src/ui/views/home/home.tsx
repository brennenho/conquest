import { Button, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import React, { useState } from "react"

import { Header } from "~ui/components"
import { Menu } from "~ui/views"

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
                    <Text fw={500} ta="center">
                        Welcome {email}
                    </Text>
                    <div className={style.button}>
                        <Button
                            variant="light"
                            color="red"
                            size="sm"
                            fullWidth
                            onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}
