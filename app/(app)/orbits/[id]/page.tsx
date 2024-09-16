"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Avatar01 from "@/public/images/avatar-01.webp";
import Avatar02 from "@/public/images/avatar-02.webp";
import Avatar03 from "@/public/images/avatar-03.webp";
import Avatar04 from "@/public/images/avatar-04.webp";
import Avatar05 from "@/public/images/avatar-05.webp";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  useAction,
  useMutation,
  usePaginatedQuery,
  useQuery,
} from "convex/react";
import { saveAs } from "file-saver";
import {
  ChevronLeft,
  Code,
  Cog,
  Lightbulb,
  Link2,
  Loader,
  Paperclip,
  Search,
  Settings,
  Trash,
  TriangleAlert,
} from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import TimeAgo from "react-timeago";

import { ACTIVE, IDEA, ISSUE, OTHER, PAUSED, PRAISE } from "@/lib/constants";
import { classNames, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import AvatarGroup from "@/components/avatar-group";
import CodeDialog from "@/components/code-dialog";
import Empty from "@/components/empty";
import FeedbackList from "@/components/feedback-list";
import { FeedbackSettings } from "@/components/feedback-settings";
import Active from "@/components/pills/active";
import Idea from "@/components/pills/idea";
import Issue from "@/components/pills/issue";
import Other from "@/components/pills/other";
import Paused from "@/components/pills/paused";
import Praise from "@/components/pills/praise";
import Stopped from "@/components/pills/stopped";
import { SettingsMenu } from "@/components/settings";

export default function SingleOrbit({ params }: { params: { id: string } }) {
  const orbit = useQuery(api.v1.orbits.fetchSingleOrbit, {
    id: params.id as any,
  });

  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.v1.feedback.fetchFeedbackForOrbit,
    {
      orbitId: params.id as any,
    },
    { initialNumItems: 10 }
  );

  return (
    <div className="">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between space-x-2 px-2 pt-10">
        <div className="flex w-full items-center justify-between">
          <Link href={"/orbits"}>
            <Button type="submit" className="px-2" variant={"outline"}>
              <ChevronLeft size={19} className="text-zinc-600" />
            </Button>
          </Link>

          {orbit !== undefined && orbit !== null && (
            <SettingsMenu
              orbitId={orbit?._id}
              name={orbit?.name as string}
              website={orbit?.website as string}
              status={orbit?.status as string}
              teamId={orbit?.teamId as string}
            />
          )}

          {/* <OrbitSheet /> */}
        </div>
        {/* header */}
        <div className="flex w-full justify-between py-16">
          {orbit === undefined && (
            <div className="flex w-full items-center justify-center">
              <Loader className="h-7 w-7 animate-spin text-zinc-400" />
            </div>
          )}
          {orbit !== undefined && orbit !== null && (
            <div className="flex w-full flex-col items-start md:flex-row md:justify-between">
              <div className="mb-2 md:mb-0">
                <div className="flex flex-wrap items-center">
                  <h4 className="mr-2 text-2xl font-medium text-zinc-600 transition-all duration-100 ease-linear lg:mr-0">
                    {orbit?.name}
                  </h4>
                  <span className="hidden h-1 w-1 rounded-full bg-zinc-400 lg:mx-4 lg:inline-block"></span>
                  <span className="mr-4 text-xs font-medium text-zinc-500">
                    Created{" "}
                    <TimeAgo date={orbit?._creationTime || Date.now()} />
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
                </div>
              </div>
              <CodeDialog orbitId={orbit?._id as string} />
            </div>
          )}
          {orbit === null && (
            <div className="flex w-full items-center justify-center">
              <TriangleAlert className="mr-1 h-6 w-6 text-amber-500" />
              <p className="text-amber-500">Orbit does not exist anymore!</p>
            </div>
          )}
        </div>
        {/* feedback section */}
        <FeedbackList orbitId={orbit?._id} results={results} />
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
      </div>
    </div>
  );
}
