"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useAuthActions } from "@convex-dev/auth/react"
import { LogOut } from "lucide-react"

import { cn } from "@/lib/utils"

export default function Signout() {
  const router = useRouter()
  const { signOut } = useAuthActions()
  return (
    <button
      onClick={() => {
        void signOut()
        router.push("/")
      }}
    >
      <p
        className={cn(
          "my-3 flex min-w-6 cursor-pointer items-center rounded-lg p-2 font-bold text-zinc-600 transition-all duration-100 ease-linear hover:bg-zinc-100 hover:text-zinc-900"
        )}
      >
        <LogOut size={20} />
        <span className="pl-2">Logout</span>
      </p>
    </button>
  )
}
