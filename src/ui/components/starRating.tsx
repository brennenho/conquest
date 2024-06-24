import React from "react"
import Ratings from 'react-ratings-declarative';
import { createRoot } from "react-dom/client"

type StarRatingProps = {
    ratings: string
}

const StarRating: React.FC<StarRatingProps> = ({
    ratings
}) => {
    return (<Ratings
        rating={3.403}
        widgetDimensions="20px"
        widgetSpacings="5px"
      >
        <Ratings.Widget widgetRatedColor="rgb(0,255,255)"/>
        <Ratings.Widget widgetRatedColor="rgb(0,255,255)"/>
        <Ratings.Widget widgetRatedColor="rgb(0,255,255)"/>
        <Ratings.Widget widgetRatedColor="rgb(0,255,255)"/>
        <Ratings.Widget widgetRatedColor="rgb(0,255,255)"/>
      </Ratings>)
}
const appendStarRating = (
    target: HTMLElement,
    rating: string
) => {
    const container = document.createElement("div")
    target.appendChild(container)

    const root = createRoot(container)
    root.render(<StarRating ratings={"2.0"}/>)
}
export default appendStarRating