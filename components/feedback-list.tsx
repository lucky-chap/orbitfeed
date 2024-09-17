"use client";

import React, { useState } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAction, useMutation, useQuery } from "convex/react";
import { saveAs } from "file-saver";
import { Check, CircleSlash, WandSparkles } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import TimeAgo from "react-timeago";

import { IDEA, ISSUE, OTHER, PRAISE, RESOLVED } from "@/lib/constants";
import { IFeedback, IMember, IOrbit } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AnalysisSheet from "./analysis-sheet";
import { FeedbackSettings } from "./feedback-settings";
import Idea from "./pills/idea";
import Issue from "./pills/issue";
import Other from "./pills/other";
import Praise from "./pills/praise";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

export default function FeedbackList({
  results,
  orbitId,
  member,
  leader,
}: {
  results: IFeedback[] | null | undefined;
  orbitId: Id<"orbits"> | null | undefined;
  leader?: Id<"users"> | null | undefined;
  member?: IMember | null | undefined;
}) {
  const user = useQuery(api.v1.user.viewer);
  const deleteFeedbackAction = useAction(api.v1.feedback.deleteFeedbackAndFile);

  const createActivityMutation = useMutation(api.v1.activities.createActivity);

  const [deleting, setDeleting] = useState(false);

  const handleDeleteFeedback = async (id: any, storageId?: any) => {
    if (orbitId) {
      setDeleting(true);
      const result = await deleteFeedbackAction({
        feedbackId: id as Id<"feedback">,
        storageId: storageId as Id<"_storage">,
      });
      if (result === "deleted") {
        const res = await createActivityMutation({
          orbitId: orbitId as Id<"orbits">,
          actorId: user?._id as Id<"users">,
          actorName: user?.name as string,
          actorImage: user?.image as string,
          action: `deleted feedback`,
        });
        if (res !== null) {
          setDeleting(false);
          toast({
            title: "Deleted!",
            description: "Feedback has been deleted",
          });
        } else {
          setDeleting(false);
          toast({
            title: "Error!",
            description: "Feedback deleted, but activity could not be created",
          });
        }
      } else {
        setDeleting(false);
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Feedback could not be deleted",
        });
      }
    }
  };

  console.log("Feedback list leader: ", leader);
  console.log("Feedback list member role: ", member?.role);

  return (
    <>
      {/* {(results?.length ?? 0) > 0 && orbit?.lastAnalysed == undefined && (
      )} */}

      <AnalysisSheet orbitId={orbitId} feedback={results} />
      <ul role="list" className="mt-4 w-full">
        {results?.map((feedback, index) => {
          return (
            <li
              key={feedback._id}
              className="relative flex items-center space-x-4 py-10"
            >
              <div className="min-w-0 flex-auto">
                <div className="flex flex-col gap-x-3">
                  {feedback.type === IDEA && (
                    <span>
                      <Idea />
                    </span>
                  )}
                  {feedback.type === ISSUE && (
                    <span>
                      <Issue />
                    </span>
                  )}
                  {feedback.type === OTHER && (
                    <span>
                      <Other />
                    </span>
                  )}
                  {feedback.type === PRAISE && (
                    <span>
                      <Praise />
                    </span>
                  )}
                  <h2 className="font- mt-2 min-w-0 text-[15px] leading-6 text-gray-600">
                    <p className="flex gap-x-2">
                      <span className="max-w-3x">{feedback.content}</span>
                    </p>
                  </h2>
                </div>
                <div className="mt-3 items-center gap-x-2.5 text-xs leading-5 text-gray-400 sm:flex">
                  <span className="mb-[2px] inline-block truncate font-medium text-gray-600 sm:mb-0 sm:inline">
                    By{" "}
                    {feedback.by.trim().length === 0
                      ? "Anonymous"
                      : feedback.by}
                  </span>
                  <svg
                    viewBox="0 0 2 2"
                    className="hidden h-0.5 w-0.5 flex-none fill-gray-500 sm:block"
                  >
                    <circle r={1} cx={1} cy={1} />
                  </svg>
                  <p className="mb-[2px] whitespace-nowrap font-medium text-gray-500 sm:mb-0">
                    <TimeAgo
                      date={
                        orbitId == undefined
                          ? Date.now()
                          : feedback._creationTime
                      }
                    />
                  </p>
                  <svg
                    viewBox="0 0 2 2"
                    className="hidden h-0.5 w-0.5 flex-none fill-gray-500 sm:block"
                  >
                    <circle r={1} cx={1} cy={1} />
                  </svg>
                  <span className="mt-[7px] flex items-center font-medium text-gray-500 sm:mt-0 sm:inline">
                    {feedback.location}{" "}
                    <ReactCountryFlag
                      countryCode={feedback.country_code}
                      svg
                      className="ml-2 text-base"
                    />
                  </span>
                  <svg
                    viewBox="0 0 2 2"
                    className="hidden h-0.5 w-0.5 flex-none fill-gray-500 sm:block"
                  >
                    <circle r={1} cx={1} cy={1} />
                  </svg>
                  <a
                    href={feedback.route}
                    className="mt-[7px] flex items-center font-medium text-zinc-500 underline sm:mt-0"
                  >
                    {feedback.route}{" "}
                  </a>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <FeedbackSettings
                    key={feedback._id}
                    orbitId={orbitId}
                    feedbackId={feedback._id}
                    imageUrl={feedback.image}
                    deleteFeedback={() =>
                      handleDeleteFeedback(
                        feedback._id,
                        feedback.image_storage_id
                      )
                    }
                    deleting={deleting}
                    member={member}
                    leader={leader}
                  />
                  <p>
                    {feedback.status === RESOLVED ? (
                      <div className="flex items-center text-xs text-green-500">
                        <Check size={13} className="mr-1" />
                        <span>Resolved</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-xs text-yellow-500">
                        <CircleSlash size={13} className="mr-1" />
                        <span>Pending</span>
                      </div>
                    )}
                  </p>
                </div>
              </div>

              {/* <FeedbackSettings
                  key={feedback._id}
                  feedbackId={feedback._id}
                  imageUrl={feedback.image}
                  deleteFeedback={() =>
                    handleDeleteFeedback(
                      feedback._id,
                      feedback.image_storage_id
                    )
                  }
                /> */}
            </li>
          );
        })}
      </ul>
    </>
  );
}
