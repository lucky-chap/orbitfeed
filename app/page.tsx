import React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <p>I'm home</p>
      <Button variant={"outline"}>
        <Link href="/orbits">Go to Orbits</Link>
      </Button>
      <Button variant={"outline"}>
        <Link href="/login">Go to Login</Link>
      </Button>
      <Button variant={"outline"}>
        <Link href="/private">Go to Private Page</Link>
      </Button>
    </div>
  )
}
