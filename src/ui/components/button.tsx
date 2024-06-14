import https from "https"
import axios from "axios"
import React from "react"
import ReactDOM from "react-dom"

import { HTTPClient } from "../../workers/http/client"

type ButtonProps = {
  label: string
  className: string
  style: React.CSSProperties
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({
  label,
  className,
  style,
  onClick
}) => {
  return (
    <button onClick={onClick} className={className} style={style}>
      {label}
    </button>
  )
}

async function addToWatchlist(
  section_id: string,
  department: string,
  email: string
) {
  const request = {
    section_id: section_id,
    department: department,
    email: email
  }
  console.log("TEST")
  const response = await HTTPClient.inst().post("/watchlist/add", request)
  console.log(response)
}

const appendWatchlistButton = (
  target: HTMLElement,
  section_id: string,
  department: string
) => {
  const label = "Add to Watchlist"
  const className = "btn btn-default add-to-course-bin col-xs-12"
  const style = { marginTop: "2px" }

  const container = document.createElement("div")
  target.appendChild(container)

  ReactDOM.render(
    <Button
      label={label}
      className={className}
      style={style}
      onClick={async () => {
        await addToWatchlist(section_id, department, "test@usc.edu")
      }}
    />,
    container
  )
}

export default appendWatchlistButton
