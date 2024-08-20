"use client"

import React from "react"
import Link from "next/link"
import { useAuthActions } from "@convex-dev/auth/react"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

export default function Home() {
  const { signIn } = useAuthActions()
  return (
    <div>
      <p>I'm home</p>
      <Button variant={"outline"}>
        <Link href="/orbits">Go to Orbits</Link>
      </Button>
      <Button
        onClick={() => void signIn("github")}
        className="bg-blue-500 text-white hover:bg-blue-600"
      >
        <GitHubLogoIcon className="mr-2 h-6 w-6" />
        Login with GitHub
      </Button>
      <Button variant={"outline"}>
        <Link href="/private">Go to Private Page</Link>
      </Button>
    </div>
  )
}
