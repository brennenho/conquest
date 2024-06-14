import React, { useState } from "react"

import "boxicons/css/boxicons.min.css"
import "./style.css"
import "@fontsource/open-sans/700.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/400.css"

import { generateToken } from "./api/http/auth"
import { HTTPClient } from "./api/http/client"

function IndexPopup() {
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

export default IndexPopup

interface CourseContainerProps {
  courseTag: string
  courseNum: string
  prof: string
  days: string
  start: string
  end: string
}

const CourseBox: React.FC<CourseContainerProps> = ({
  courseTag,
  courseNum,
  prof,
  days,
  start,
  end
}) => {
  return (
    <div className="course-container">
      <CourseIcon courseTag={courseTag} />
      <div className="info">
        <h3>
          {courseTag} {courseNum}
        </h3>
        <h4>{prof}</h4>
      </div>
      <div className="time">
        <p>{days}</p>
        <p>Start: {start}</p>
        <p>End: {end}</p>
      </div>
    </div>
  )
}

interface CourseIconProps {
  courseTag: string
}

const CourseIcon: React.FC<CourseIconProps> = ({ courseTag }) => {
  if (courseTag === "CSCI") {
    return (
      <div className="icon viterbi">
        <i className="bx bx-code-alt"></i>
      </div>
    )
  }
}
