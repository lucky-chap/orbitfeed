"use client";

import React, { useState } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAction, useMutation } from "convex/react";
import ReactCountryFlag from "react-country-flag";
import TimeAgo from "react-timeago";

import { IDEA, ISSUE, OTHER, PRAISE } from "@/lib/constants";
import { IFeedback, IOrbit } from "@/lib/types";

import { FeedbackSettings } from "./feedback-settings";
import Idea from "./pills/idea";
import Issue from "./pills/issue";
import Other from "./pills/other";
import Praise from "./pills/praise";
import { toast } from "./ui/use-toast";

export default function FeedbackList({
  results,
  orbit,
}: {
  results: IFeedback[] | null | undefined;
  orbit: IOrbit | null | undefined;
}) {
  const deleteOrbitMutation = useMutation(api.app.orbits.deleteOrbit);
  const deleteFeedbackAction = useAction(
    api.app.feedback.deleteFeedbackAndFile
  );

  const [deleting, setDeleting] = useState(false);

  const handleDeleteFeedback = async (id: any, storageId?: any) => {
    if (orbit?._id) {
      setDeleting(true);
      const result = await deleteFeedbackAction({
        feedbackId: id as Id<"feedback">,
        storageId: storageId as Id<"_storage">,
      });
      if (result === "deleted") {
        setDeleting(false);
        toast({
          title: "Deleted!",
          description: "Feedback has been deleted",
        });
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

  return (
    <ul role="list" className="w-full divide-y divide-black/5">
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
                <h2 className="mt-2 min-w-0 text-sm font-medium leading-6 text-gray-700">
                  <p className="flex gap-x-2">
                    <span className="max-w-3x">{feedback.content}</span>
                  </p>
                </h2>
              </div>
              <div className="mt-3 items-center gap-x-2.5 text-xs leading-5 text-gray-400 sm:flex">
                <span className="mb-[2px] inline-block truncate font-medium text-zinc-600 sm:mb-0 sm:inline">
                  By{" "}
                  {feedback.by.trim().length === 0 ? "Anonymous" : feedback.by}
                </span>
                <svg
                  viewBox="0 0 2 2"
                  className="hidden h-0.5 w-0.5 flex-none fill-gray-500 sm:block"
                >
                  <circle r={1} cx={1} cy={1} />
                </svg>
                <p className="mb-[2px] whitespace-nowrap font-medium text-zinc-500 sm:mb-0">
                  <TimeAgo
                    date={
                      orbit == undefined ? Date.now() : feedback._creationTime
                    }
                  />
                </p>
                <svg
                  viewBox="0 0 2 2"
                  className="hidden h-0.5 w-0.5 flex-none fill-gray-500 sm:block"
                >
                  <circle r={1} cx={1} cy={1} />
                </svg>
                <span className="mt-[7px] flex items-center font-medium text-zinc-500 sm:mt-0 sm:inline">
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
              <div className="mt-4">
                <FeedbackSettings
                  key={feedback._id}
                  feedbackId={feedback._id}
                  imageUrl={feedback.image}
                  deleteFeedback={() =>
                    handleDeleteFeedback(
                      feedback._id,
                      feedback.image_storage_id
                    )
                  }
                />
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
  );
}
