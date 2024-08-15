import React from "react"
import { ShieldCheck, ShieldEllipsis } from "lucide-react"

export default function Paused() {
  return (
    <span className="inline-flex items-center gap-x-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500">
      <ShieldEllipsis size={13} className="p-0" />
      Paused
    </span>
  )
}

//<span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">Yellow</span>
