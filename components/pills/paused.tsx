import React from "react"
import { ShieldCheck, ShieldEllipsis } from "lucide-react"

export default function Paused() {
  return (
    <span className="inline-flex items-center gap-x-1 rounded-full bg-fuchsia-100 px-2 py-1 text-xs font-medium text-fuchsia-800 dark:bg-fuchsia-500/10 dark:text-fuchsia-500">
      <ShieldEllipsis size={13} className="p-0" />
      Paused
    </span>
  )
}

//<span class="bg-fuchsia-100 text-fuchsia-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-fuchsia-300 border border-yellow-300">Yellow</span>
