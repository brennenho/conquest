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
  const styleDefault = { marginTop: "2px" }
  const styleWatching = { marginTop: "2px", backgroundColor: "black" }
  const watchlistManager = new WatchlistManager()

  React.useEffect(() => {
    const checkWatchlist = async () => {
      const status = await watchlistManager.getWatchlistStatus(sectionId)
      if (status && status === "watching") {
        console.log("SET LABEL FOR ", sectionId)
        setLabel("Remove from watchlist")
      }
    }

    checkWatchlist()
  }, [])

  const onClick = async () => {
    if (label === "Remove from watchlist") {
      await watchlistManager.removeFromWatchlist(sectionId, setLabel)
    } else {
      await watchlistManager.addToWatchlist(sectionId, department, setLabel)
    }
  }
  return (
    <button onClick={onClick} className={className} style={styleDefault}>
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
