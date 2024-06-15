import cn from "classnames"

export function Subtitle({
  text,
  className
}: {
  text: string
  className?: string
}) {
  return <h2 className={cn(className)}>{text}</h2>
}
