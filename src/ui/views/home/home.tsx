import { useDisclosure } from "@mantine/hooks"
import React, { useState } from "react"

import { Header } from "~ui/components"
import sharedStyles from "~ui/sharedStyles.module.scss"
import { Menu } from "~ui/views"

import { AboutView, CoursesView, WatchlistView, RecommendationView } from ".."

interface HomeViewProps {
    email: string
    handleLogout: () => void
}

export const HomeView: React.FC<HomeViewProps> = ({ email, handleLogout }) => {
    const [menuOpened, { toggle }] = useDisclosure()
    const [view, setView] = useState<string>("home")

    return (
        <div className={sharedStyles.fullHeight}>
            <Header title={view} menuOpened={menuOpened} onClick={toggle} />
            <Menu
                email={email}
                menuOpened={menuOpened}
                toggleMenu={toggle}
                setCurrentView={setView}
                handleLogout={handleLogout}
            />
            {view === "home" && <CoursesView />}
            {view === "watchlist" && <WatchlistView />}
            {view === "about" && <AboutView />}
            {view === "recommend" && <RecommendationView/>}
        </div>
    )
}
