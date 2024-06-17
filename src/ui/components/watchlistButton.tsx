import React from "react"
import ReactDOM from "react-dom"

import { WatchlistManager } from "../../backend/managers"

type WatchlistButtonProps = {
  sectionId: string
  department: string
}

const WatchlistButton: React.FC<WatchlistButtonProps> = ({
  sectionId,
  department
}) => {
  const [label, setLabel] = React.useState("Add to watchlist")
  const className = "btn btn-default add-to-course-bin col-xs-12"
  const styleDefault = {
    marginTop: "2px",
    backgroundColor: "white",
    color: "#666666"
  }
  const styleWatching = {
    marginTop: "2px",
    backgroundColor: "#8c1a11",
    color: "white"
  }
  const [style, setStyle] = React.useState(styleDefault)
  const watchlistManager = new WatchlistManager()

  React.useEffect(() => {
    const checkWatchlist = async () => {
      const status = await watchlistManager.getWatchlistStatus(sectionId)
      if (status && status === "watching") {
        setLabel("Remove from watchlist")
      }
    }

    checkWatchlist()
  }, [])

  const onClick = async () => {
    if (label === "Remove from watchlist") {
      await watchlistManager.removeFromWatchlist(sectionId, setLabel)
      setStyle(styleDefault)
    } else {
      await watchlistManager.addToWatchlist(sectionId, department, setLabel)
      setStyle(styleWatching)
    }
  }
  return (
    <button onClick={onClick} className={className} style={style}>
      {label}
    </button>
  )
}

const appendWatchlistButton = (
  target: HTMLElement,
  section_id: string,
  department: string
) => {
  const container = document.createElement("div")
  target.appendChild(container)

  ReactDOM.render(
    <WatchlistButton sectionId={section_id} department={department} />,
    container
  )
}

export default appendWatchlistButton
