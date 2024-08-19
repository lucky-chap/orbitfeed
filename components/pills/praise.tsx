import React from "react"
import { ThumbsUp } from "lucide-react"

export default function Praise() {
  return (
    <span className="inline-flex items-center gap-x-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-500/10 dark:text-blue-500">
      <ThumbsUp size={13} />
      Praise
    </span>
  )
}
