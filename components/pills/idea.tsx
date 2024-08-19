import React from "react"
import { Lightbulb } from "lucide-react"

export default function Idea() {
  return (
    <span className="inline-flex items-center gap-x-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 dark:bg-amber-500/10 dark:text-amber-500">
      <Lightbulb size={13} />
      Idea
    </span>
  )
}
