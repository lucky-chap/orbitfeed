"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ChevronRightIcon, Link2 } from "lucide-react";
import TimeAgo from "react-timeago";

import { ACTIVE, PAUSED } from "@/lib/constants";
import { IOrbit } from "@/lib/types";
import { classNames } from "@/lib/utils";

import Active from "./pills/active";
import Paused from "./pills/paused";

export default function OrbitList({
  searchTerm,
  isTeamRoute,
  teamId,
  results,
}: {
  searchTerm?: string | undefined;
  isTeamRoute: boolean;
  teamId?: Id<"teams"> | undefined;
  results: IOrbit[] | null | undefined;
}) {
  return (
    <ul role="list" className="divide-y divide-black/5">
      {searchTerm?.trim().length === 0 &&
        results?.map((orbit, _) => (
          <li
            key={orbit._id}
            className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
          >
            <div className="min-w-0 flex-auto">
              <div className="flex items-center gap-x-3">
                <h2 className="min-w-0 text-sm font-semibold leading-6 text-gray-800">
                  <Link
                    href={
                      isTeamRoute
                        ? `/teams/${teamId}/${orbit._id}`
                        : `/orbits/${orbit._id}`
                    }
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
              <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5">
                <a
                  href={orbit.website}
                  target="_blank"
                  className="flex items-center truncate font-semibold text-zinc-700"
                >
                  <Link2 size={16} className="mr-1" />
                  {orbit.website}
                </a>
                <svg
                  viewBox="0 0 2 2"
                  className="h-0.5 w-0.5 flex-none fill-gray-500"
                >
                  <circle r={1} cx={1} cy={1} />
                </svg>
                <p className="whitespace-nowrap text-zinc-500">
                  Created{" "}
                  <TimeAgo
                    date={orbit == undefined ? Date.now() : orbit._creationTime}
                  />
                </p>
              </div>
            </div>

            {orbit.status === ACTIVE && <Active />}
            {orbit.status === PAUSED && <Paused />}
            <ChevronRightIcon
              aria-hidden="true"
              className="h-5 w-5 flex-none text-gray-400"
            />
          </li>
        ))}
    </ul>
  );
}
