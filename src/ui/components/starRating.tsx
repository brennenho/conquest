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
        widgetDimensions="10px"
        widgetSpacings="2px"
      >
        <Ratings.Widget widgetRatedColor="rgb(245, 236, 66)"/>
        <Ratings.Widget widgetRatedColor="rgb(245, 236, 66)"/>
        <Ratings.Widget widgetRatedColor="rgb(245, 236, 66)"/>
        <Ratings.Widget widgetRatedColor="rgb(245, 236, 66)"/>
        <Ratings.Widget widgetRatedColor="rgb(245, 236, 66)"/>
      </Ratings>)
}
const appendStarRating = (
    target: HTMLElement,
    rating: string
) => {
    const container = document.createElement("div")
    target.appendChild(container)

    const root = createRoot(container)
    root.render(<StarRating ratings={rating}/>)
}
export default appendStarRating