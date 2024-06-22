import React, { useEffect, useState } from "react"

import { StorageManager } from "../backend/managers"
import { HomeView, LoginView } from "./views"

function App() {
    const [currentView, setCurrentView] = useState<string>("login")
    const [email, setEmail] = useState<string | null>(null)
    const storageManager = new StorageManager()

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

    const switchView = (view: string) => {
        setCurrentView(view)
    }

    const handleLogout = async () => {
        await storageManager.remove("userEmail")
        setEmail(null)
        setCurrentView("login")
    }

    const handleLogin = async (email: string) => {
        await storageManager.set("userEmail", email)
        setEmail(email)
        setCurrentView("home")
    }

    return (
        <div>
            {currentView === "login" && <LoginView handleLogin={handleLogin} />}
            {currentView === "home" && (
                <HomeView email={email} handleLogout={handleLogout} />
            )}
        </div>
    )
}

export default App
