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
        rating={Number(ratings)}
        widgetDimensions="15px"
        widgetSpacings="2px"
      >
        <Ratings.Widget widgetRatedColor="rgb(0,0,0)"/>
        <Ratings.Widget widgetRatedColor="rgb(0,0,0)"/>
        <Ratings.Widget widgetRatedColor="rgb(0,0,0)"/>
        <Ratings.Widget widgetRatedColor="rgb(0,0,0)"/>
        <Ratings.Widget widgetRatedColor="rgb(0,0,0)"/>
      </Ratings>)
}

const appendStarRating = (
    target: HTMLElement,
    rating: string
) => {
    const container = document.createElement("div")
    target.appendChild(container)

    const root = createRoot(container)
    root.render(<a href="//google.com" target="_blank"><StarRating ratings={rating}/></a>)
}
export default appendStarRating