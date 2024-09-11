"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuthActions } from "@convex-dev/auth/react";
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
import { Bars3Icon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  FolderIcon,
  GlobeAltIcon,
  PlusCircleIcon,
  ServerIcon,
  SignalIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { usePaginatedQuery, useQuery } from "convex/react";
import { ChevronRightIcon, Loader } from "lucide-react";

import { classNames } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FeedbackList from "@/components/feedback-list";

const statuses: any = {
  offline: "text-gray-500 bg-gray-100/10",
  online: "text-green-400 bg-green-400/10",
  error: "text-rose-400 bg-rose-400/10",
};
const environments: any = {
  Preview: "text-gray-400 bg-gray-400/10 ring-gray-400/20",
  Production: "text-indigo-400 bg-indigo-400/10 ring-indigo-400/30",
};
const deployments = [
  {
    id: 1,
    href: "#",
    projectName: "ios-app",
    teamName: "Planetaria",
    status: "offline",
    statusText: "Initiated 1m 32s ago",
    description: "Deploys from GitHub",
    environment: "Preview",
  },
  // More deployments...
];

const activityItems = [
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    projectName: "ios-app",
    commit: "2d89f0c8",
    branch: "main",
    date: "1h",
    dateTime: "2023-01-23T11:00",
  },
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    projectName: "ios-app",
    commit: "2d89f0c8",
    branch: "main",
    date: "1h",
    dateTime: "2023-01-23T11:00",
  },
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    projectName: "ios-app",
    commit: "2d89f0c8",
    branch: "main",
    date: "1h",
    dateTime: "2023-01-23T11:00",
  },
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    projectName: "ios-app",
    commit: "2d89f0c8",
    branch: "main",
    date: "1h",
    dateTime: "2023-01-23T11:00",
  },
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    projectName: "ios-app",
    commit: "2d89f0c8",
    branch: "main",
    date: "1h",
    dateTime: "2023-01-23T11:00",
  },
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    projectName: "ios-app",
    commit: "2d89f0c8",
    branch: "main",
    date: "1h",
    dateTime: "2023-01-23T11:00",
  },
  // More items...
];

export default function TeamOrbits({ params }: { params: { slug: string } }) {
  const user = useQuery(api.user.viewer);

  const pathname = usePathname();

  // first path is the teamId
  const teamId = pathname.split("/")[2];

  const orbitId = params.slug;

  console.log("Team ID: ", teamId);
  console.log("Orbit ID: ", orbitId);

  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.app.feedback.fetchFeedbackForOrbit,
    {
      orbitId: orbitId as Id<"orbits">,
    },
    { initialNumItems: 10 }
  );

  console.log("Feedback Results for orbit: ", results);

  return (
    <>
      <div>
        <div className="xl:pl-">
          <main className="lg:pr-96">
            <header className="flex items-center justify-between border-b border-black/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <h1 className="text-base font-semibold leading-7 text-gray-700">
                Feedback for orbit
              </h1>
            </header>

            {/* Feedback list */}
            <div className="mx-auto max-w-6xl px-4">
              <FeedbackList
                results={results}
                orbitId={orbitId as Id<"orbits">}
              />
            </div>

            <div className="flex w-full justify-center py-6">
              {status === "LoadingMore" ||
                (status === "LoadingFirstPage" && (
                  <div className="mr-12 flex h-full min-h-[70vh] items-center justify-center">
                    <Loader className="h-7 w-7 animate-spin text-zinc-400" />
                  </div>
                ))}

              {status === "Exhausted" && results?.length === 0 && (
                <div className="mt-56">
                  <p className="text-center">No feedback for this orbit.</p>
                </div>
              )}

              {status === "CanLoadMore" && (
                <div className="mx-auto mt-6 max-w-sm px-3 pr-32">
                  <Button
                    onClick={() => loadMore(10)}
                    className="bg-indigo-500 hover:bg-indigo-600"
                  >
                    {isLoading ? "Loading..." : "Load More"}
                  </Button>
                </div>
              )}
            </div>
          </main>
          {/* Activity feed */}
          <aside className="bg-gray-50/20 lg:fixed lg:bottom-0 lg:right-0 lg:top-0 lg:w-96 lg:overflow-y-auto lg:ring-1 lg:ring-black/10">
            <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <h2 className="text-sm font-semibold leading-7 text-gray-700">
                Activity feed
              </h2>
            </header>
            <ul role="list" className="divide-y divide-white/5">
              {activityItems.map((item) => (
                <li key={item.commit} className="px-4 py-4 sm:px-6 lg:px-8">
                  <div className="flex items-center gap-x-3">
                    <img
                      alt=""
                      src={item.user.imageUrl}
                      className="h-6 w-6 flex-none rounded-full bg-gray-800"
                    />
                    <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-gray-600">
                      {item.user.name}
                    </h3>
                    <time
                      dateTime={item.dateTime}
                      className="flex-none text-xs text-gray-600"
                    >
                      {item.date}
                    </time>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    Pushed to{" "}
                    <span className="text-gray-600">{item.projectName}</span> (
                    <span className="font-mono text-indigo-400">
                      {item.commit}
                    </span>{" "}
                    on{" "}
                    <span className="text-gray-600">
                      {item.branch} and made some silly changes we cannot talk
                      about right now
                    </span>
                    )
                  </p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
}
