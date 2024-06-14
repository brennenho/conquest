import React, { useState } from "react"

import { Storage } from "@plasmohq/storage"

import { CoursesView } from "./views/coursesView/courses"
import { LoginView } from "./views/loginView/login"

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>("loginView")

  const switchView = (view: string) => {
    setCurrentView(view)
  }

  return (
    <div>
      {currentView === "loginView" && <LoginView switchView={switchView} />}
      {currentView === "B" && <CoursesView switchView={switchView} />}
      {/* {currentView === "C" && <ViewC switchView={switchView} />} */}
    </div>
  )
}

export default App
