import React from "react"

import { CourseBox } from "../../components/courseBox/courseBox"

export const CoursesView: React.FC<{ switchView: (view: string) => void }> = ({
  switchView
}) => {
  return (
    <div className="popup">
      <div className="header">
        <h1>COURSES</h1>
      </div>
      <div className="header-bar"></div>
      <button
        onClick={async () => {
          //   const token = generateToken("JH7Q2-KLP8A-9X4VZ-WS2T3-MN6YD")
          //   HTTPClient.getInstance().setToken(await token)
          //   console.log(token)
        }}>
        Generate Token
      </button>
      <div className="courses">
        <CourseBox
          courseTag="CSCI"
          courseNum="104"
          prof="John Doe"
          days="MW"
          start="11:00 AM"
          end="12:30 PM"
        />
        <CourseBox
          courseTag="CSCI"
          courseNum="104"
          prof="John Doe"
          days="MW"
          start="11:00 AM"
          end="12:30 PM"
        />
        <CourseBox
          courseTag="CSCI"
          courseNum="104"
          prof="John Doe"
          days="MW"
          start="11:00 AM"
          end="12:30 PM"
        />
        <CourseBox
          courseTag="CSCI"
          courseNum="104"
          prof="John Doe"
          days="MW"
          start="11:00 AM"
          end="12:30 PM"
        />
        <CourseBox
          courseTag="CSCI"
          courseNum="104"
          prof="John Doe"
          days="MW"
          start="11:00 AM"
          end="12:30 PM"
        />
      </div>
    </div>
  )
}
