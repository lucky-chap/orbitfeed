import React from "react"
import { Ban } from "lucide-react"

export default function Stopped() {
  return (
    <span className="inline-flex items-center gap-x-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-500/10 dark:text-red-500">
      {/* <svg
        className="size-3 shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
      </svg> */}
      <Ban size={13} />
      Stopped
    </span>
  )
}
