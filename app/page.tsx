import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div>
      <p>I'm home</p>
      <Button variant={"outline"}>
        <Link href="/orbit">Go to Orbit</Link>
      </Button>
    </div>
  );
}
