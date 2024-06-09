import { useState } from "react"

import "boxicons/css/boxicons.min.css"
import "./style.css"

function IndexPopup() {
  return (
    <div className="popup">
      <h1>
        <i className="bx bxs-flag-alt"></i> Conquest
      </h1>
      <footer>
        Crafted with <i className="bx bxs-heart"></i> by{" "}
        <a href="https://brennen.dev" target="_blank">
          Brennen
        </a>
      </footer>
    </div>
  )
}

export default IndexPopup
