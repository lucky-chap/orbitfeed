import React from "react"
import { Bot } from "lucide-react"

export default function Other() {
  return (
    <span className="inline-flex items-center gap-x-1 rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-800 dark:bg-zinc-500/10 dark:text-zinc-500">
      <Bot size={13} />
      Other
    </span>
  )
}
