"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { api } from "@/convex/_generated/api"
import brick from "@/public/images/white-brick-wall.jpg"
import { useMutation, usePaginatedQuery, useQuery } from "convex/react"
import { saveAs } from "file-saver"
import {
  ChevronLeft,
  Code,
  Lightbulb,
  Link2,
  Loader2,
  Paperclip,
  Search,
  Settings,
  Trash,
} from "lucide-react"
import TimeAgo from "react-timeago"

import { ACTIVE, IDEA, ISSUE, OTHER, PAUSED, PRAISE } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import AvatarGroup from "@/components/avatar-group"
import CodeDialog from "@/components/code-dialog"
import Empty from "@/components/empty"
import { OrbitSheet } from "@/components/orbit-sheet"
import Active from "@/components/pills/active"
import Idea from "@/components/pills/idea"
import Issue from "@/components/pills/issue"
import Other from "@/components/pills/other"
import Paused from "@/components/pills/paused"
import Praise from "@/components/pills/praise"
import Stopped from "@/components/pills/stopped"
import { SettingsMenu } from "@/components/settings"

export default function SingleOrbit({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  const orbit = useQuery(api.app.orbits.fetchSingleOrbit, {
    id: params.id as any,
  })
  const {
    results,
    status,
    loadMore,
    isLoading: paginatedLoading,
  } = usePaginatedQuery(
    api.app.feedback.fetchFeedbackForOrbit,
    {
      orbitId: params.id as any,
    },
    { initialNumItems: 10 }
  )

  console.log("Single orbit: ", orbit)
  console.log("Feedback for orbit: ", results)
  const deleteOrbitMutation = useMutation(api.app.orbits.deleteOrbit)
  const deleteFeedbackMutation = useMutation(api.app.feedback.deleteFeedback)

  const handleDeleteOrbit = async () => {
    if (orbit?._id) {
      setDeleting(true)
      const result = await deleteOrbitMutation({
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

  const handleDeleteFeedback = async (id: any) => {
    if (orbit?._id) {
      setDeleting(true)
      const result = await deleteFeedbackMutation({
        feedbackId: id,
      })
      if (result === "deleted") {
        setDeleting(false)
        toast({
          title: "Deleted!",
          description: "Feedback has been deleted",
        })
      } else {
        setDeleting(false)
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Feedback could not be deleted",
        })
      }
    }
  }

  const handleDownloadFile = async (author: string, url: string) => {
    const response = await fetch(url)
    const blob = await response.blob()
    saveAs(blob, `${author}-feedback-image.jpg`)
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
            handleDeleteOrbit={handleDeleteOrbit}
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
                {orbit?.status === ACTIVE && <Active />}
                {orbit?.status === PAUSED && <Paused />}
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

          <CodeDialog orbitId={orbit?._id as string} />
        </div>
        {/* feedback section */}
        <div className="w-full divide-y divide-gray-300/30 px-36">
          {results?.map((feedback, index) => (
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
                      {feedback.by.trim().length === 0
                        ? "Anonymous"
                        : feedback.by}
                    </p>
                  </div>
                  <span className="mx-3">
                    {feedback.type === IDEA && <Idea />}
                    {feedback.type === PRAISE && <Praise />}
                    {feedback.type === ISSUE && <Issue />}
                    {feedback.type === OTHER && <Other />}
                  </span>
                  <div className="flex items-center text-xs">
                    <span className="mr-2 font-medium text-zinc-500">
                      {" "}
                      <TimeAgo date={feedback?._creationTime || Date.now()} />
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
                      {feedback.location} 🏳️‍🌈
                    </span>
                  </a>
                </div>
              </div>

              <p className="text-base text-zinc-600">{feedback.content}</p>

              <div className="mt-4 flex items-center justify-between">
                {feedback.image.length > 0 && (
                  <Button
                    variant={"secondary"}
                    className="text-xs"
                    onClick={() =>
                      handleDownloadFile(
                        feedback.by.trim().length === 0
                          ? "anonymous"
                          : feedback.by.toLowerCase(),
                        feedback.image
                      )
                    }
                  >
                    <Paperclip size={13} className="mr-2" />
                    Download
                  </Button>
                  // <a href={feedback.image} download>
                  // </a>
                )}

                <Button variant={"ghost"} className="text-xs">
                  {deleting ? (
                    <Loader2 className="animate-spin" size={13} />
                  ) : (
                    <Trash
                      size={13}
                      onClick={() => handleDeleteFeedback(feedback._id)}
                    />
                  )}
                </Button>
              </div>

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
        <div className="flex w-full justify-center py-6">
          {paginatedLoading && (
            <div className="mt-56 flex h-full items-center justify-center">
              <Loader2 className="h-7 w-7 animate-spin text-blue-500" />
            </div>
          )}

          {status === "LoadingMore" && (
            <div className="mt-56 flex h-full items-center justify-center">
              <Loader2 className="h-7 w-7 animate-spin text-blue-500" />
            </div>
          )}

          {status === "CanLoadMore" && (
            <div className="">
              <Button
                // variant={"ghost"}
                onClick={() => loadMore(10)}
                className="mr-2 mt-10 rounded-md bg-blue-500 px-5 py-2 font-medium text-white transition-all duration-100 ease-linear hover:bg-blue-600"
              >
                {paginatedLoading ? "Loading..." : "Load More"}
                {paginatedLoading ? (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                ) : (
                  <Loader2 className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
          )}

          {!results && paginatedLoading && (
            <div className="flex h-full min-h-[70vh] items-center justify-center">
              <Loader2 className="h-7 w-7 animate-spin" />
            </div>
          )}

          {results?.length === 0 && (
            <div className="mt-56">
              <p className="text-center">No feedback for this orbit.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
