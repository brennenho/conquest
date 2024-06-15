import React, { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"

import CoursesView from "./views/coursesView/courses"
import LoginView from "./views/loginView/login"

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>("loginView")
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const checkStoredEmail = async () => {
      const storage = new Storage()
      const storedEmail = await storage.get("userEmail")
      if (storedEmail) {
        setEmail(storedEmail)
        setCurrentView("coursesView")
      }
    }

    checkStoredEmail()
  }, [])

  const switchView = (view: string) => {
    setCurrentView(view)
  }

  const handleLogout = async () => {
    const storage = new Storage()
    await storage.remove("userEmail")
    setEmail(null)
    setCurrentView("loginView")
  }

  const handleLogin = async (email: string) => {
    const storage = new Storage()
    await storage.set("userEmail", email)
    setEmail(email)
    setCurrentView("coursesView")
  }

  return (
    <div>
      {currentView === "loginView" && (
        <LoginView switchView={switchView} handleLogin={handleLogin} />
      )}
      {currentView === "coursesView" && (
        <CoursesView email={email} handleLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
