"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { api } from "@/convex/_generated/api"
import brick from "@/public/images/white-brick-wall.jpg"
import { useMutation, useQuery } from "convex/react"
import {
  ChevronLeft,
  Code,
  Lightbulb,
  Link2,
  Paperclip,
  Search,
  Settings,
  Trash,
} from "lucide-react"
import TimeAgo from "react-timeago"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import AvatarGroup from "@/components/avatar-group"
import { OrbitSheet } from "@/components/orbit-sheet"
import Active from "@/components/pills/active"
import Paused from "@/components/pills/paused"
import Stopped from "@/components/pills/stopped"
import { SettingsMenu } from "@/components/settings"

export default function SingleOrbit({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  const orbit = useQuery(api.app.orbits.fetchSingleOrbit, {
    id: params.id as any,
  })
  console.log("Single orbit: ", orbit)
  const deleteMutation = useMutation(api.app.orbits.deleteOrbit)

  const handleDelete = async () => {
    if (orbit?._id) {
      setDeleting(true)
      const result = await deleteMutation({
        orbitId: orbit._id,
      })
      if (result === "deleted") {
        setDeleting(false)
        router.push("/orbits")
        toast({
          title: "Deleted!",
          description: "Orbit has been deleted",
        })
      } else {
        setDeleting(false)
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Orbit could not be deleted",
        })
      }
    }
  }
  return (
    <div className="">
      {/* <h4 className="flex items-center">
        <House size={25} />
        <span className="pl-2 text-lg font-semibold text-zinc-700">Orbit</span>
      </h4> */}
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between space-x-2">
        <div className="flex w-full items-center justify-between">
          <Link href={"/orbits"}>
            <Button type="submit" className="px-2" variant={"outline"}>
              <ChevronLeft size={19} className="text-zinc-600" />
            </Button>
          </Link>

          <div className="flex items-center text-xs">
            <a
              href=" https://somewebsite.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-zinc-500">Last feedback from Ghana 🏳️‍🌈</span>
            </a>
          </div>

          <SettingsMenu
            orbitId={orbit?._id}
            name={orbit?.name as string}
            website={orbit?.website as string}
            status={orbit?.status as string}
            handleDelete={handleDelete}
          />
          {/* <OrbitSheet /> */}
        </div>
        {/* header */}
        <div className="my-20 flex w-full justify-between">
          <div className="">
            <div className="flex flex-wrap items-center">
              <h4 className="text-2xl font-medium text-zinc-600 transition-all duration-100 ease-linear">
                {orbit?.name}
              </h4>
              <span className="mx-4 inline-block h-1 w-1 rounded-full bg-zinc-400"></span>
              <span className="mr-4 text-xs font-medium text-zinc-500">
                Created <TimeAgo date={orbit?._creationTime || Date.now()} />
              </span>
              <div className="my-2">
                {orbit?.status === "Active" && <Active />}
                {orbit?.status === "Paused" && <Paused />}
                {orbit?.status === "Stopped" && <Stopped />}
              </div>
            </div>
            <div className="flex items-center">
              {/* <AvatarGroup /> */}
              <span className="flex items-center text-xs font-bold text-zinc-600">
                <a
                  href={orbit?.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Link2 size={20} className="mr-1 text-zinc-600" />
                  <span>{orbit?.website}</span>
                </a>
              </span>
              {/* <Button variant={"link"} className="ml-2">
                <span className="text-xs font-medium text-zinc-500">
                  Delete
                </span>
              </Button> */}
            </div>
          </div>

          <Button variant={"ghost"}>
            <Code size={20} className="mr-1 text-zinc-600" />
            <span className="text-xs font-bold">Embed</span>
          </Button>
        </div>
        {/* feedback section */}
        <div className="divide-y divide-gray-300/30 px-36">
          {Array(4)
            .fill("")
            .map((_, index) => (
              <div
                key={index}
                className="rounded-xl py-14 transition-all duration-100 ease-linear"
              >
                <div className="flex items-center justify-between">
                  <div className="item my-2 flex items-center">
                    <div className="my-2 flex items-center">
                      {/* <img
                      className="mr-2 inline-block size-[26px] rounded-full ring-2 ring-white dark:ring-neutral-900"
                      src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                      alt="Avatar"
                    /> */}
                      <p className="text-sm font-semibold text-zinc-700">
                        Anastasia Jokovic
                      </p>
                    </div>
                    <span className="mx-3 inline-flex items-center gap-x-1 rounded-full bg-sky-100 px-2 py-1 text-xs font-medium text-sky-800 dark:bg-sky-500/10 dark:text-sky-500">
                      <Lightbulb className="h-4 w-4" />
                      Idea
                    </span>
                    <div className="flex items-center text-xs">
                      <span className="mr-2 font-medium text-zinc-500">
                        Created 2 days ago
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-xs">
                    <a
                      href=" https://somewebsite.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="font-medium text-zinc-500">
                        From Ghana 🏳️‍🌈
                      </span>
                    </a>
                  </div>
                </div>

                <p className="text-base text-zinc-600">
                  Use these Tailwind CSS form and form layout components to
                  build things like settings screens in your application. These
                  form components are designed and built by the Tailwind CSS
                  team, and include a variety of different styles and layouts.
                </p>

                <p className="flex items-center pt-4 text-xs font-semibold italic text-blue-500">
                  <Paperclip size={13} className="mr-2" />
                  Download file
                </p>

                <div className="flex items-start justify-between">
                  {/* <Image
              src={brick}
              alt="brick wall"
              height={100}
              width={100}
              className="rounded pr-2"
            /> */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
