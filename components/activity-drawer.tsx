"use client";

import * as React from "react";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { usePaginatedQuery } from "convex/react";
import { Loader } from "lucide-react";
import TimeAgo from "react-timeago";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function ActivityDrawer({ orbitId }: { orbitId: Id<"orbits"> }) {
  const [goal, setGoal] = React.useState(350);

  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.v1.activities.getActivitiesForOrbit,
    {
      orbitId: orbitId as Id<"orbits">,
    },
    { initialNumItems: 10 }
  );

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="border-none bg-transparent p-0 text-indigo-500 shadow-none hover:bg-transparent hover:text-indigo-600"
        >
          Activity
        </Button>
      </DrawerTrigger>
      <DrawerContent className="">
        <div className="h-full max-h-[90vh] w-full overflow-y-scroll">
          <DrawerHeader>
            <DrawerTitle>Activity Feed</DrawerTitle>
            <DrawerDescription className="sr-only">
              Set your daily activity goal.
            </DrawerDescription>
          </DrawerHeader>
          <ul role="list" className="divide-y divide-white/5 p-4 pb-10">
            {results.map((item) => (
              <li key={item._id} className="px-4 py-4">
                <div className="flex items-center gap-x-3">
                  <Image
                    width={24}
                    height={24}
                    alt={"User avatar"}
                    src={item.actorImage}
                    className="h-6 w-6 flex-none rounded-full bg-gray-800"
                  />
                  <h3 className="font flex-auto truncate text-sm leading-6 text-gray-600">
                    {item.actorName}
                  </h3>
                  <p className="flex-none text-xs text-gray-600">
                    <TimeAgo
                      date={item == undefined ? Date.now() : item._creationTime}
                    />
                  </p>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  <span className="text-gray-600">
                    {item.action.charAt(0).toUpperCase() + item.action.slice(1)}
                  </span>
                </p>
              </li>
            ))}
            {status === "LoadingMore" ||
              (status === "LoadingFirstPage" && (
                <div className="flex h-full min-h-[70vh] items-center justify-center">
                  <Loader className="h-7 w-7 animate-spin text-zinc-400" />
                </div>
              ))}

            {status === "Exhausted" && results?.length === 0 && (
              <div className="mt-56 flex flex-col items-center justify-center">
                <p className="text-center">No activity for this orbit.</p>
              </div>
            )}

            {status === "CanLoadMore" && (
              <div className="mx-auto mt-16 max-w-sm px-3 pr-32">
                <Button
                  onClick={() => loadMore(10)}
                  className="bg-indigo-500 hover:bg-indigo-600"
                >
                  {isLoading ? "Loading..." : "Load More"}
                </Button>
              </div>
            )}
          </ul>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="mt-10">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
