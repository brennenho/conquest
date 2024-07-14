import React, { useEffect, useState } from "react"

import { UserManager } from "~backend/managers"

import { StorageManager } from "./backend/managers"
import { HomeView, LoginView } from "./ui/views"

import "@mantine/core/styles.css"
import "@mantine/notifications/styles.css"

import { createTheme, MantineProvider, Portal } from "@mantine/core"
import { Notifications } from "@mantine/notifications"

function IndexPopup() {
    const [currentView, setCurrentView] = useState<string>("login")
    const [email, setEmail] = useState<string | null>(null)
    const storageManager = new StorageManager()

    // On startup, check if user is logged in
    useEffect(() => {
        const checkStoredEmail = async () => {
            const storedEmail = await storageManager.get("userEmail")
            if (storedEmail) {
                setEmail(storedEmail)
                setCurrentView("home")
            }
        }

        checkStoredEmail()
    }, [])

    const handleLogout = async () => {
        await new UserManager().setValidationWindow(false)
        setEmail(null)
        setCurrentView("login")
        await storageManager.remove("userEmail")
        await storageManager.remove("watchlist")
    }

    const handleLogin = async (email: string) => {
        await storageManager.set("userEmail", email)
        setEmail(email)
        setCurrentView("home")
        await storageManager.set("courseReload", true)
    }

    const theme = createTheme({
        fontFamily: "Open Sans, sans-serif",
        defaultRadius: "sm"
    })

    return (
        <MantineProvider theme={theme}>
            <Notifications position="bottom-right" autoClose={3000} limit={1} />
            {currentView === "login" && <LoginView handleLogin={handleLogin} />}
            {currentView === "home" && (
                <HomeView email={email} handleLogout={handleLogout} />
            )}
        </MantineProvider>
    )
}

export default IndexPopup
