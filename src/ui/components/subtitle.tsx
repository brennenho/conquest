import cn from "classnames"

export function Subtitle({
  text,
  className
}: {
  text: string
  className?: string
}) {
  return <h2 className={cn("noMargin", className)}>{text}</h2>
}
