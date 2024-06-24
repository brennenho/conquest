import cn from "classnames"

import style from "./title.module.scss"

export function Title({
    text,
    className
}: {
    text: string
    className?: string
}) {
    return <h1 className={cn(style.title, className)}>{text}</h1>
}
