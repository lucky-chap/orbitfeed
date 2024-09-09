"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Avatar01 from "@/public/images/avatar-01.webp";
import Avatar02 from "@/public/images/avatar-02.webp";
import Avatar03 from "@/public/images/avatar-03.webp";
import Avatar04 from "@/public/images/avatar-04.webp";
import Avatar05 from "@/public/images/avatar-05.webp";
import { ChevronRightIcon } from "lucide-react";
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
        results?.map((orbit, index) => (
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
  );
}
