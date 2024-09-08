"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
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
import Active from "@/components/pills/active";
import Paused from "@/components/pills/paused";

const FormSchema = z.object({
  search_term: z.string().min(2, {
    message: "",
  }),
});

export default function Team({ params }: { params: { id: string } }) {
  const user = useQuery(api.user.viewer);
  const team = useQuery(api.app.teams.fetchSingleTeam, {
    id: params.id as any,
  });

  const allTeams = useQuery(api.app.teams.fetchTeams, {
    userId: user?._id as Id<"users">,
    user_email: user?.email as string,
  });

  console.log("Team: ", team);
  console.log("All teams: ", allTeams);

  const [searchTerm, setSearchTerm] = useState("");

  const teamOrbits = useQuery(api.app.orbits.fetchOrbitsForTeam, {
    teamId: team?._id as Id<"teams">,
  });

  console.log("Orbits for team: ", teamOrbits);

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
      {team == undefined ? (
        <div className="mx-auto flex min-h-[10vh] max-w-sm flex-col justify-center px-3 pl-40">
          <Loader className="h-7 w-7 animate-spin text-zinc-400" />
        </div>
      ) : (
        <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <h1 className="text-base font-semibold leading-7">
            Team {team.name}
          </h1>
          <Button className="bg-blue-500 hover:bg-blue-600">
            Add new members
          </Button>
        </header>
      )}

      {/* Orbit list */}
      <ul role="list" className="divide-y divide-black/5">
        {teamOrbits?.map((orbit, index) => (
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
                      : "bg-amber-400/10 text-fuchsia-400 ring-fuchsia-400/30",
                    "flex-none rounded-full p-1"
                  )}
                >
                  <div className="h-2 w-2 rounded-full bg-current" />
                </div>
                <h2 className="min-w-0 text-sm font-semibold leading-6 text-gray-800">
                  <Link
                    href={`/teams/${team?._id}/orbit/${orbit._id}`}
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
                    date={orbit == undefined ? Date.now() : orbit._creationTime}
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
            {/* <div
                className={classNames(
                  orbit.status === ACTIVE
                    ? "bg-green-100 text-green-400 ring-green-400/20"
                    : "bg-amber-100 text-amber-400 ring-amber-400/30",
                  "ml-2 flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset"
                )}
              >
                {orbit.status}
              </div> */}
            {orbit.status === ACTIVE && <Active />}
            {orbit.status === PAUSED && <Paused />}
            <ChevronRightIcon
              aria-hidden="true"
              className="h-5 w-5 flex-none text-gray-400"
            />
          </li>
        ))}
      </ul>

      {teamOrbits !== undefined && teamOrbits?.length === 0 && (
        <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-3 text-center">
          <h2 className="text-lg font-medium">No orbits for this team</h2>
          <p className="text-zinc-500">
            Try creating a new orbit and add to team
          </p>
        </div>
      )}
      {teamOrbits == undefined && (
        <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center px-3 pl-40">
          <Loader className="h-7 w-7 animate-spin text-zinc-400" />
        </div>
      )}
    </div>
  );
}
