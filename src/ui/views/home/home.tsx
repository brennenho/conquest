import { Button, Text, Title } from "@mantine/core"
import React from "react"

import style from "./home.module.scss"

interface HomeViewProps {
    email: string
    handleLogout: () => void
}

export const HomeView: React.FC<HomeViewProps> = ({ email, handleLogout }) => {
    return (
        <div>
            <div className={style.title}>
                <Title order={2}>Home</Title>
            </div>
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
        </div>
    )
}
