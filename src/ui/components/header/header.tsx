import { Burger, Text } from "@mantine/core"
import React from "react"

import icon from "~/assets/icon.png"

import style from "./header.module.scss"

interface HeaderProps {
    menuOpened: boolean
    onClick: () => void
}

export const Header: React.FC<HeaderProps> = ({ menuOpened, onClick }) => {
    return (
        <div className={style.header}>
            <img src={icon} alt="icon" className={style.icon} />
            <Text fw={700} size="xl">
                CONQUEST
            </Text>
            <div className={style.menu}>
                <Burger
                    opened={menuOpened}
                    onClick={onClick}
                    aria-label="Toggle menu"
                />
            </div>
        </div>
    )
}
