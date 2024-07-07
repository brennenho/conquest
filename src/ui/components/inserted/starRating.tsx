import React from "react"
import { createRoot } from "react-dom/client"
import Ratings from "react-ratings-declarative"

type StarRatingProps = {
    ratings: string
}

const StarRating: React.FC<StarRatingProps> = ({ ratings }) => {
    return (
        <Ratings
            rating={Number(ratings)}
            widgetDimensions="15px"
            widgetSpacings="2px">
            <Ratings.Widget widgetRatedColor="rgb(0,0,0)" />
            <Ratings.Widget widgetRatedColor="rgb(0,0,0)" />
            <Ratings.Widget widgetRatedColor="rgb(0,0,0)" />
            <Ratings.Widget widgetRatedColor="rgb(0,0,0)" />
            <Ratings.Widget widgetRatedColor="rgb(0,0,0)" />
        </Ratings>
    )
}

export const appendStarRating = (
    target: HTMLElement,
    rating: string,
    professorId: string
) => {
    const container = document.createElement("div")
    target.appendChild(container)

    const root = createRoot(container)
    const url = `//www.ratemyprofessors.com/professor/${professorId}`
    root.render(
        <a href={url} target="_blank">
            <StarRating ratings={rating} />
        </a>
    )
}
export default appendStarRating
