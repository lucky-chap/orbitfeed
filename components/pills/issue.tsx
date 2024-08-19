import React from "react"
import { Bug } from "lucide-react"

export default function Issue() {
  return (
    <span className="inline-flex items-center gap-x-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-500/10 dark:text-red-500">
      <Bug size={13} />
      Issue
    </span>
  )
}
