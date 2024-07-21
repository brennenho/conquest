import { Avatar, Button, Drawer, Modal, NavLink, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import {
    IconBinocularsFilled,
    IconChevronRight,
    IconHomeFilled,
    IconInfoSquareRoundedFilled,
    IconCalendarEvent,
    IconLogout
} from "@tabler/icons-react"
import { useState } from "react"

import style from "./menu.module.scss"

// Data for links in menu
const data = [
    {
        icon: IconHomeFilled,
        label: "Home",
        rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
        view: "home"
    },
    {
        icon: IconBinocularsFilled,
        label: "Watchlist",
        rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
        view: "watchlist"
    },
    {
        icon: IconCalendarEvent,
        label: "Recommendation",
        rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
        view: "recommend"
    },
    {
        icon: IconInfoSquareRoundedFilled,
        label: "About",
        rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
        view: "about"
    }
]

interface MenuProps {
    email: string
    menuOpened: boolean
    toggleMenu: () => void
    setCurrentView(view: string): void
    handleLogout: () => void
}

export const Menu: React.FC<MenuProps> = ({
    email,
    menuOpened,
    toggleMenu,
    setCurrentView,
    handleLogout
}) => {
    const [active, setActive] = useState(0)
    const [logoutOpened, { open, close }] = useDisclosure(false)

    const items = data.map((item, index) => (
        <NavLink
            href="#required-for-focus"
            key={item.label}
            active={index === active}
            label={item.label}
            rightSection={item.rightSection}
            leftSection={<item.icon size="1rem" stroke={1.5} />}
            onClick={() => {
                setActive(index)
                setCurrentView(item.view)
                toggleMenu()
            }}
            color="red"
        />
    ))

    return (
        <>
            <Modal
                opened={logoutOpened}
                onClose={close}
                centered
                withCloseButton={false}
                className={style.modal}
                size="75%">
                {
                    <div className={style.logout}>
                        <Button
                            variant="light"
                            color="red"
                            size="sm"
                            fullWidth
                            onClick={handleLogout}>
                            Logout
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
            {/* Manually build drawer to avoid covering header */}
            <Drawer.Root
                opened={menuOpened}
                onClose={toggleMenu}
                position="right">
                <Drawer.Overlay
                    className={style.overlay}
                    backgroundOpacity={0.25}
                />
                <Drawer.Content className={style.menu}>
                    <div className={style.content}>
                        <div className={style.links}>{items}</div>
                        <div
                            role="button"
                            tabIndex={0}
                            className={style.profile}
                            onClick={open}>
                            <div className={style.user}>
                                <Avatar
                                    variant="transparent"
                                    radius="xl"
                                    color="black"
                                />
                                <Text fw={500}>{email}</Text>
                            </div>
                            <IconLogout
                                size="1rem"
                                stroke={1.5}
                                className={style.settings}
                            />
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Root>
        </>
    )
}
