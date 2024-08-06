"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import brick from "@/public/images/white-brick-wall.jpg"
import { House, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Orbit() {
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
        {Array(4)
          .fill("")
          .map((_, index) => (
            <div className="flex items-start justify-between py-7">
              <div className="flex flex-col">
                <Link href={"/orbits"}>
                  <h4 className="text-base font-semibold text-zinc-700 transition-all duration-100 ease-linear hover:underline">
                    Atque perspiciatis et et aut ut porro voluptatem blanditiis
                  </h4>
                </Link>
                <div className="flex items-center pt-1 text-xs text-zinc-500">
                  <span>Leslie Alexander</span>
                  <span className="mx-2 inline-block h-1 w-1 rounded-full bg-zinc-400"></span>
                  <span className="mr-2">2d ago</span>
                  <div>
                    <span className="inline-flex items-center gap-x-1 rounded-full bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800 dark:bg-teal-500/10 dark:text-teal-500">
                      <svg
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
                      </svg>
                      Connected
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="mr-4">
                  <div className="flex -space-x-2">
                    <img
                      className="inline-block size-[26px] rounded-full ring-2 ring-white dark:ring-neutral-900"
                      src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                      alt="Avatar"
                    />
                    <img
                      className="inline-block size-[26px] rounded-full ring-2 ring-white dark:ring-neutral-900"
                      src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                      alt="Avatar"
                    />
                    <img
                      className="inline-block size-[26px] rounded-full ring-2 ring-white dark:ring-neutral-900"
                      src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
                      alt="Avatar"
                    />
                    <img
                      className="inline-block size-[26px] rounded-full ring-2 ring-white dark:ring-neutral-900"
                      src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                      alt="Avatar"
                    />
                    <div className="hs-dropdown relative inline-flex [--placement:top-left]">
                      <button
                        id="hs-avatar-group-dropdown"
                        className="hs-dropdown-toggle inline-flex size-[26px] items-center justify-center rounded-full border-2 border-white bg-gray-100 align-middle text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:bg-gray-300 focus:outline-none dark:border-neutral-800 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        aria-label="Dropdown"
                      >
                        <span className="font-medium leading-none">9+</span>
                      </button>

                      <div
                        className="hs-dropdown-menu hs-dropdown-open:opacity-100 z-10 mb-2 hidden w-48 rounded-lg bg-white p-2 opacity-0 shadow-md transition-[margin,opacity] duration-300 dark:divide-neutral-700 dark:border dark:border-neutral-700 dark:bg-neutral-800"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="hs-avatar-group-dropdown"
                      >
                        <a
                          className="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                          href="#"
                        >
                          Chris Lynch
                        </a>
                        <a
                          className="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                          href="#"
                        >
                          Maria Guan
                        </a>
                        <a
                          className="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                          href="#"
                        >
                          Amil Evara
                        </a>
                        <a
                          className="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                          href="#"
                        >
                          Ebele Egbuna
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
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
