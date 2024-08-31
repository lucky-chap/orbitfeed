"use client";

import React, { useState } from "react";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePaginatedQuery, useQuery } from "convex/react";
import { House, Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import TimeAgo from "react-timeago";
import { z } from "zod";

import { ACTIVE, PAUSED } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CodeDialog from "@/components/code-dialog";
import Empty from "@/components/empty";
import Active from "@/components/pills/active";
import Paused from "@/components/pills/paused";
import Stopped from "@/components/pills/stopped";

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

  console.log("Search results: ", searchResults);

  return (
    <div className="">
      {/* <h4 className="flex items-center">
        <House size={25} />
        <span className="pl-2 text-lg font-semibold text-zinc-700">Orbit</span>
      </h4> */}
      <div className="mx-auto flex w-full max-w-5xl items-center space-x-2">
        <Input
          placeholder="Search for Orbits..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-full focus-visible:ring-1 focus-visible:ring-blue-400"
        />
        {/* <Button
          type="submit"
          className="rounded-full bg-blue-500 hover:bg-blue-600"
        >
          Search
        </Button> */}
      </div>
      <div className="mx-auto my-20 flex max-w-5xl flex-col divide-y divide-gray-300/50">
        {searchTerm.trim().length === 0 &&
          results.map((orbit, index) => (
            <div key={index} className="flex items-start justify-between py-7">
              <div className="flex flex-col">
                <Link href={`/orbits/${orbit._id}`}>
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
                    <TimeAgo
                      date={
                        orbit == undefined ? Date.now() : orbit._creationTime
                      }
                    />
                  </span>
                  <div>
                    {orbit.status === ACTIVE && <Active />}
                    {orbit.status === PAUSED && <Paused />}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <CodeDialog orbitId={orbit?._id as string} />
              </div>
            </div>
          ))}

        {paginatedLoading && (
          <div className="flex h-full min-h-[70vh] items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-blue-500" />
          </div>
        )}

        {status === "LoadingMore" && (
          <div className="flex h-full min-h-[70vh] items-center justify-center">
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
      </div>
      {status === "Exhausted" && results?.length === 0 && (
        <div className="mt-56 flex w-full items-center justify-center">
          {/* <p className="text-center">You have no orbits.</p> */}
          <Link href={"/create"}>
            <Button variant={"secondary"} className="ml-2">
              <Plus size={14} className="mr-2" />
              Create new orbit
            </Button>
          </Link>
        </div>
      )}

      {/* SEARCH RESULTS */}

      <div className="mx-auto my-20 flex max-w-5xl flex-col divide-y divide-gray-300/50">
        {searchTerm.trim().length > 0 &&
          searchResults.length > 0 &&
          searchResults.map((orbit, index) => (
            <div key={index} className="flex items-start justify-between py-7">
              <div className="flex flex-col">
                <Link href={`/orbits/${orbit._id}`}>
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
                    <TimeAgo
                      date={
                        orbit == undefined ? Date.now() : orbit._creationTime
                      }
                    />
                  </span>
                  <div>
                    {orbit.status === ACTIVE && <Active />}
                    {orbit.status === PAUSED && <Paused />}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <CodeDialog orbitId={orbit?._id as string} />
              </div>
            </div>
          ))}

        {searchTerm.trim().length > 0 && searchLoading && (
          <div className="flex h-full min-h-[70vh] items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-blue-500" />
          </div>
        )}

        {searchTerm.trim().length > 0 && searchStatus === "LoadingMore" && (
          <div className="flex h-full min-h-[70vh] items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-blue-500" />
          </div>
        )}

        {searchTerm.trim().length > 0 && searchStatus === "CanLoadMore" && (
          <div className="">
            <Button
              // variant={"ghost"}
              onClick={() => loadMore(10)}
              className="mr-2 mt-10 rounded-md bg-blue-500 px-5 py-2 font-medium text-white transition-all duration-100 ease-linear hover:bg-blue-600"
            >
              {searchLoading ? "Loading..." : "Load More"}
              {searchLoading ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <Loader2 className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        )}

        {searchTerm.trim().length > 0 && !searchResults && searchLoading && (
          <div className="flex h-full min-h-[70vh] items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin" />
          </div>
        )}
      </div>

      {searchTerm.trim().length > 0 && searchResults?.length === 0 && (
        <div className="mt-56 flex w-full items-center justify-center">
          <p className="text-center">No results found.</p>
        </div>
      )}
    </div>
  );
}
