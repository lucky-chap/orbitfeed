"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import brick from "@/public/images/white-brick-wall.jpg"
import {
  ChevronLeft,
  Lightbulb,
  Link2,
  Paperclip,
  Search,
  Settings,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AvatarGroup from "@/components/avatar-group"
import { OrbitSheet } from "@/components/orbit-sheet"
import Active from "@/components/pills/active"
import { SettingsMenu } from "@/components/settings"

export default function SingleOrbit() {
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

          {/* <SettingsMenu /> */}
          <OrbitSheet />
        </div>
        {/* header */}
        <div className="my-20 w-full">
          <div className="flex flex-wrap items-center">
            <h4 className="text-2xl font-medium text-zinc-600 transition-all duration-100 ease-linear">
              Solaris
            </h4>
            <span className="mx-4 inline-block h-1 w-1 rounded-full bg-zinc-400"></span>
            <span className="mr-2 text-xs text-zinc-500">
              Created 2 days ago
            </span>
            <div className="my-2">
              <Active />
            </div>
          </div>
          <div className="flex items-center justify-between">
            {/* <AvatarGroup /> */}
            <span className="flex items-center text-xs font-bold text-zinc-600">
              <a
                href="https://metafy.gg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Link2 size={20} className="mr-1 text-zinc-600" />
                https://metafy.gg
              </a>
            </span>
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
          {/* description */}
          {/* <p className="text-base font-medium italic text-zinc-600">
            Use these Tailwind CSS form and form layout components to build
            things like settings screens in your application. These form
            components are designed and built by the Tailwind CSS team, and
            include a variety of different styles and layouts.
          </p> */}
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
                <div className="item my-2 flex items-center">
                  <div className="my-2 flex items-center">
                    <img
                      className="mr-2 inline-block size-[26px] rounded-full ring-2 ring-white dark:ring-neutral-900"
                      src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                      alt="Avatar"
                    />
                    <p className="text-sm font-semibold text-zinc-700">
                      Anastasia Jokovic
                    </p>
                  </div>
                  <span className="mx-3 inline-flex items-center gap-x-1 rounded-full bg-sky-100 px-2 py-1 text-xs font-medium text-sky-800 dark:bg-sky-500/10 dark:text-sky-500">
                    <Lightbulb className="h-4 w-4" />
                    Idea
                  </span>
                  <div className="flex items-center text-xs">
                    <span className="mr-2 text-zinc-600">
                      Created 2 days ago
                    </span>
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
