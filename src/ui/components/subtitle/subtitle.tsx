import cn from "classnames"

import style from "./subtitle.module.scss"

export function Subtitle({
    text,
    className
}: {
    text: string
    className?: string
}) {
    return <h2 className={cn(style.subtitle, className)}>{text}</h2>
}
