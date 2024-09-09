"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import Avatar01 from "@/public/images/avatar-01.webp";
import Avatar02 from "@/public/images/avatar-02.webp";
import Avatar03 from "@/public/images/avatar-03.webp";
import Avatar04 from "@/public/images/avatar-04.webp";
import Avatar05 from "@/public/images/avatar-05.webp";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePaginatedQuery, useQuery } from "convex/react";
import { House, Loader, Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import TimeAgo from "react-timeago";
import { z } from "zod";

import { ACTIVE, PAUSED } from "@/lib/constants";
import { classNames } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Empty from "@/components/empty";
import OrbitList from "@/components/orbit-list";
import Active from "@/components/pills/active";
import Paused from "@/components/pills/paused";

const FormSchema = z.object({
  search_term: z.string().min(2, {
    message: "",
  }),
});

export default function Orbit() {
  const user = useQuery(api.user.viewer);

  const [searchTerm, setSearchTerm] = useState("");

  const {
    results,
    status,
    loadMore,
    isLoading: paginatedLoading,
  } = usePaginatedQuery(
    api.app.orbits.fetchOrbits,
    {
      userId: user?._id,
      user_email: user?.email,
    },
    { initialNumItems: 10 }
  );

  // console.log("Results: ", results)
  // console.log("Userid: ", user?._id)

  const {
    results: searchResults,
    status: searchStatus,
    loadMore: searchLoadMore,
    isLoading: searchLoading,
  } = usePaginatedQuery(
    api.app.orbits.searchOrbits,
    {
      userId: user?._id,
      searchTerm: searchTerm,
    },
    { initialNumItems: 10 }
  );

  // console.log("Results: ", results);
  // console.log("Search results: ", searchResults);

  return (
    <div>
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-black/5 bg-gray-50 px-4 shadow-sm sm:px-6 lg:px-8">
        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form action="#" method="GET" className="flex flex-1">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
              />
              <input
                id="search-field"
                name="search"
                type="search"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 focus:ring-0 sm:text-sm"
              />
            </div>
          </form>
        </div>
      </div>
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h1 className="text-base font-semibold leading-7">Orbits</h1>
      </header>

      {/* Orbit list */}
      <OrbitList
        searchTerm={searchTerm}
        results={results}
        isTeamRoute={false}
        teamId={undefined}
      />

      {/* Search list: not necessary to put this into a component, since it's used only here */}
      <ul role="list" className="divide-y divide-black/5">
        {searchTerm.trim().length > 0 &&
          searchResults.length > 0 &&
          searchResults.map((orbit, index) => (
            <li
              key={orbit._id}
              className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
            >
              <div className="min-w-0 flex-auto">
                <div className="flex items-center gap-x-3">
                  <div
                    className={classNames(
                      orbit.status === ACTIVE
                        ? "bg-green-400/10 text-green-400 ring-green-400/20"
                        : "bg-amber-400/10 text-amber-400 ring-amber-400/30",
                      "flex-none rounded-full p-1"
                    )}
                  >
                    <div className="h-2 w-2 rounded-full bg-current" />
                  </div>
                  <h2 className="min-w-0 text-sm font-semibold leading-6 text-gray-800">
                    <Link
                      href={`/orbits/${orbit._id}`}
                      className="flex gap-x-2"
                    >
                      <span className="truncate">{orbit.name}</span>
                      {/* <span className="text-gray-400">/</span> */}
                      {/* <span className="whitespace-nowrap">
                            {deployment.projectName}
                          </span> */}
                      <span className="absolute inset-0" />
                    </Link>
                  </h2>
                </div>
                <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                  <a
                    href={orbit.website}
                    target="_blank"
                    className="truncate font-medium text-zinc-600 underline"
                  >
                    {orbit.website}
                  </a>
                  <svg
                    viewBox="0 0 2 2"
                    className="h-0.5 w-0.5 flex-none fill-gray-500"
                  >
                    <circle r={1} cx={1} cy={1} />
                  </svg>
                  <p className="whitespace-nowrap">
                    Created{" "}
                    <TimeAgo
                      date={
                        orbit == undefined ? Date.now() : orbit._creationTime
                      }
                    />
                  </p>
                </div>
              </div>
              <div className="-mx-0.5 flex justify-center -space-x-3">
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar01}
                  width={24}
                  height={24}
                  alt="Avatar 01"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar02}
                  width={24}
                  height={24}
                  alt="Avatar 01"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar03}
                  width={24}
                  height={24}
                  alt="Avatar 02"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar04}
                  width={24}
                  height={24}
                  alt="Avatar 03"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar05}
                  width={24}
                  height={24}
                  alt="Avatar 04"
                />
              </div>
              <div
                className={classNames(
                  orbit.status === ACTIVE
                    ? "bg-green-100 text-green-400 ring-green-400/20"
                    : "bg-amber-100 text-amber-400 ring-amber-400/30",
                  "flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset"
                )}
              >
                {orbit.status}
              </div>
              <ChevronRightIcon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-gray-400"
              />
            </li>
          ))}
      </ul>

      {searchTerm.trim().length > 0 && searchLoading && (
        <div className="flex h-full min-h-[70vh] items-center justify-center">
          <Loader className="h-7 w-7 animate-spin text-zinc-400" />
        </div>
      )}

      {searchTerm.trim().length > 0 && searchStatus === "LoadingMore" && (
        <div className="flex h-full min-h-[70vh] items-center justify-center">
          <Loader className="h-7 w-7 animate-spin text-zinc-400" />
        </div>
      )}

      {status === "Exhausted" && results?.length === 0 && (
        <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-3">
          <Empty />
        </div>
      )}
      {searchTerm.trim().length > 0 && !searchResults && searchLoading && (
        <div className="mx-auto max-w-sm px-3 pl-40">
          <Loader className="h-7 w-7 animate-spin text-zinc-400" />
        </div>
      )}

      {status === "LoadingMore" ||
        (status === "LoadingFirstPage" && (
          <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center px-3 pl-40">
            <Loader className="h-7 w-7 animate-spin text-zinc-400" />
          </div>
        ))}
      {!results && paginatedLoading && (
        <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center px-3 pl-40">
          <Loader className="h-7 w-7 animate-spin text-zinc-400" />
        </div>
      )}

      {searchTerm.trim().length > 0 &&
        searchResults?.length === 0 &&
        searchStatus === "Exhausted" && (
          <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-3 text-center">
            <h2 className="text-lg font-medium">No results found</h2>
            <p className="text-zinc-500">
              We can&apos;t find any orbit with that name at the moment, try
              searching something else.
            </p>
          </div>
        )}

      {status === "CanLoadMore" && (
        <div className="mx-auto max-w-sm px-3 pl-32">
          <Button
            onClick={() => loadMore(10)}
            className="bg-indigo-500 hover:bg-indigo-600"
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
