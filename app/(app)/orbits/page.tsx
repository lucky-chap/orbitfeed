"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { api } from "@/convex/_generated/api"
import { userId } from "@/convex/auth"
import brick from "@/public/images/white-brick-wall.jpg"
import { usePaginatedQuery, useQuery } from "convex/react"
import { House, Search } from "lucide-react"
import TimeAgo from "react-timeago"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AvatarGroup from "@/components/avatar-group"
import Active from "@/components/pills/active"
import Paused from "@/components/pills/paused"

export default function Orbit() {
  const user = useQuery(api.user.viewer)

  const {
    results,
    status,
    loadMore,
    isLoading: paginatedLoading,
  } = usePaginatedQuery(
    api.app.orbits.fetchOrbits,
    {
      userId: user?._id,
    },
    { initialNumItems: 5 }
  )

  console.log("Results: ", results)
  console.log("Userid: ", user?._id)

  return (
    <div className="">
      {/* <h4 className="flex items-center">
        <House size={25} />
        <span className="pl-2 text-lg font-semibold text-zinc-700">Orbit</span>
      </h4> */}
      <div className="mx-auto flex w-full max-w-5xl items-center space-x-2">
        <Input
          type="text"
          placeholder="Pladius"
          className="rounded-full focus-visible:ring-2 focus-visible:ring-transparent"
        />
        <Button
          type="submit"
          className="rounded-full bg-blue-500 hover:bg-blue-600"
        >
          {/* <Search size={19} className="mr-2" /> */}
          Search
        </Button>
      </div>
      <div className="mx-auto my-20 flex max-w-5xl flex-col divide-y divide-gray-300/50">
        {results.map((orbit, index) => (
          <div key={index} className="flex items-start justify-between py-7">
            <div className="flex flex-col">
              <Link href={`/orbits/${orbit.name.toLowerCase()}-${orbit._id}`}>
                <h4 className="text-base font-semibold text-zinc-700 transition-all duration-100 ease-linear hover:underline">
                  {orbit.name}
                </h4>
              </Link>
              <div className="flex items-center pt-1 text-xs text-zinc-500">
                <span className="font-bold underline">
                  <a
                    href={`${orbit.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {orbit.website}
                  </a>
                </span>
                <span className="mx-2 inline-block h-1 w-1 rounded-full bg-zinc-400"></span>
                {/* <span className="mr-2">{orbit._creationTime}</span> */}
                <span className="mr-2">
                  <TimeAgo date={orbit._creationTime} />
                </span>
                <div>
                  {orbit.status === "Active" && <Active />}
                  {orbit.status === "Paused" && <Paused />}
                  {orbit.status === "Stopped" && <Active />}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              {/* <AvatarGroup /> */}
              {/* feedback svg */}
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="gray"
                  aria-hidden="true"
                  className="mr-2 h-6 stroke-zinc-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  ></path>
                </svg>
                <span>12</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
