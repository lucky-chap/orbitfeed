"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, usePaginatedQuery, useQuery } from "convex/react";
import { Loader, TriangleAlert, Wand, WandSparkles } from "lucide-react";
import TimeAgo from "react-timeago";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import ActivityDrawer from "@/components/activity-drawer";
import FeedbackList from "@/components/feedback-list";

export default function TeamOrbits({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [loading, setLoading] = useState(false);
  const user = useQuery(api.v1.user.viewer);

  const pathname = usePathname();

  // first path is the teamId
  const teamId = pathname.split("/")[2];

  const member = useQuery(api.v1.members.getSingleMemberForTeam, {
    memberId: user?._id as Id<"users">,
    teamId: teamId as Id<"teams">,
  });
  const team = useQuery(api.v1.teams.fetchSingleTeam, {
    id: teamId as Id<"teams">,
  });
  const orbitId = params.slug;

  const orbit = useQuery(api.v1.orbits.fetchSingleOrbit, {
    id: orbitId as Id<"orbits">,
  });

  const {
    results: activityResults,
    status: activityStatus,
    loadMore: loadMoreActivity,
    isLoading: isLoadingActivity,
  } = usePaginatedQuery(
    api.v1.activities.getActivitiesForOrbit,
    {
      orbitId: orbitId as Id<"orbits">,
    },
    { initialNumItems: 10 }
  );

  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.v1.feedback.fetchFeedbackForOrbit,
    {
      orbitId: orbitId as Id<"orbits">,
    },
    { initialNumItems: 10 }
  );

  const updateOrbitMutation = useMutation(api.v1.orbits.updateOrbit);

  const handleRemoveOrbitFromTeam = async () => {
    const result = await updateOrbitMutation({
      orbitId: orbitId as Id<"orbits">,
      name: orbit?.name as string,
      status: orbit?.status as string,
      website: orbit?.website as string,
      teamId: undefined,
    });
    if (result === "updated") {
      // router.push("/orbits");
      router.push(`/teams/${teamId}`);
      toast({
        title: "Success!",
        description: "Orbit removed from team",
      });
    }
  };

  console.log("Feedback for this orbit: ", orbit);

  return (
    <>
      <div>
        <div className="xl:pl-">
          <main className="lg:pr-96">
            <header className="flex flex-col flex-wrap justify-between border-b border-black/5 px-4 py-4 sm:flex-row sm:items-center sm:px-6 sm:py-6 lg:pr-8">
              <h1 className="text-base font-semibold leading-7 text-gray-700">
                {orbit !== undefined &&
                  orbit !== null &&
                  "Feedback for " + orbit?.name}
                {/* Feedback */}
              </h1>
              {orbit === null && (
                <div className="flex items-center">
                  <TriangleAlert className="mr-1 h-6 w-6 text-amber-500" />
                  <p className="text-amber-500">
                    Orbit does not exist anymore!
                  </p>
                </div>
              )}
              <div className="my-2 flex items-center justify-between sm:my-0">
                {orbit !== undefined && user?._id === orbit?.userId && (
                  <div className="flex items-center">
                    {/* <Button
                      className="mt-2 w-full bg-blue-500 hover:bg-blue-600 sm:mr-2 sm:mt-0"
                      disabled={loading}
                    >
                      <WandSparkles size={16} className="mr-1" />
                      {loading ? "Generating summary..." : "Generate summary"}
                    </Button> */}
                    <Button
                      variant={"secondary"}
                      className="text-red-500 hover:text-red-500"
                      disabled={loading}
                      onClick={() => handleRemoveOrbitFromTeam()}
                    >
                      {loading ? "Removing orbit..." : "Remove orbit"}
                    </Button>
                  </div>
                )}
              </div>
              {!isDesktop && (
                <div className="ml-1">
                  <ActivityDrawer orbitId={orbitId as Id<"orbits">} />
                </div>
              )}
            </header>

            {/* Feedback list */}
            <div className="mx-auto mt-4 max-w-6xl px-4">
              <FeedbackList
                results={results}
                orbitId={orbitId as Id<"orbits">}
                leader={team?.leader}
                member={member}
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
            <ul role="list" className="divide-y divide-white/5 pb-10">
              {activityResults.map((item) => (
                <li key={item._id} className="px-4 py-4 sm:px-6 lg:px-8">
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
                        date={
                          item == undefined ? Date.now() : item._creationTime
                        }
                      />
                    </p>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    <span className="text-gray-600">
                      {item.action.charAt(0).toUpperCase() +
                        item.action.slice(1)}
                    </span>
                  </p>
                </li>
              ))}

              {activityStatus === "LoadingMore" ||
                (activityStatus === "LoadingFirstPage" && (
                  <div className="flex h-full min-h-[70vh] items-center justify-center">
                    <Loader className="h-7 w-7 animate-spin text-zinc-400" />
                  </div>
                ))}

              {activityStatus === "Exhausted" &&
                activityResults?.length === 0 && (
                  <div className="mt-56 flex flex-col items-center justify-center">
                    <p className="text-center">No activity for this orbit.</p>
                  </div>
                )}

              {activityStatus === "CanLoadMore" && (
                <div className="mx-auto mt-16 max-w-sm px-3 pr-32">
                  <Button
                    onClick={() => loadMoreActivity(10)}
                    className="bg-indigo-500 hover:bg-indigo-600"
                  >
                    {isLoadingActivity ? "Loading..." : "Load More"}
                  </Button>
                </div>
              )}
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
}
