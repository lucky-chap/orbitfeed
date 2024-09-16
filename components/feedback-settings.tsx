"use client";

import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import saveAs from "file-saver";
import {
  Download,
  Ellipsis,
  Flag,
  RectangleEllipsis,
  Settings,
  Trash,
} from "lucide-react";

import { PENDING, RESOLVED, VIEWER } from "@/lib/constants";
import { IMember } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "./ui/use-toast";

export function FeedbackSettings({
  orbitId,
  feedbackId,
  imageUrl,
  deleteFeedback,
  deleting,
  leader,
  member,
}: {
  orbitId: Id<"orbits"> | null | undefined;
  feedbackId: Id<"feedback">;
  imageUrl: string;
  deleteFeedback: (id: Id<"feedback">) => void;
  deleting: boolean;
  leader?: Id<"users"> | null | undefined;
  member?: IMember | null | undefined;
}) {
  const user = useQuery(api.v1.user.viewer);
  const handleDownloadFile = async (
    feedbackId: Id<"feedback">,
    url: string
  ) => {
    if (url !== "no_image") {
      const response = await fetch(url);
      const blob = await response.blob();
      saveAs(blob, `${feedbackId}.png`);
    }
  };

  const updateFeedbackStatusMutation = useMutation(
    api.v1.feedback.updateFeedbackStatus
  );

  const createActivityMutation = useMutation(api.v1.activities.createActivity);

  const handleFeedbackStatus = async (status: string) => {
    const result = await updateFeedbackStatusMutation({
      feedbackId: feedbackId,
      feedbackStatus: status,
    });
    if (result === "feedback_status_updated") {
      const res = await createActivityMutation({
        orbitId: orbitId as Id<"orbits">,
        actorId: user?._id as Id<"users">,
        actorName: user?.name as string,
        actorImage: user?.image as string,
        action: `marked feedback as ${status.toLowerCase()}`,
      });
      if (res !== null) {
        toast({
          variant: "default",
          title: "Updated!",
          description: "Feedback status updated successfully",
        });
      } else {
        toast({
          variant: "default",
          title: "Updated!",
          description:
            "Feedback status updated, but activity could not be created",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Failure!",
        description: "Feedback status could not be updated",
      });
    }
  };

  console.log("Member is viewer: ", member?.role === VIEWER);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-5 p-2 text-xs">
          <Ellipsis size={15} className="text-zinc-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <>
            <DropdownMenuItem
              disabled={imageUrl.trim().length == 0 || imageUrl === "no_image"}
              onClick={() => handleDownloadFile(feedbackId, imageUrl)}
            >
              <Download className="mr-2 text-zinc-500" size={18} />{" "}
              {imageUrl.trim().length > 0 ? "Download image" : "No image"}
            </DropdownMenuItem>
          </>
          <DropdownMenuItem
            disabled={member?.role === VIEWER || deleting}
            onClick={() => deleteFeedback(feedbackId)}
          >
            {" "}
            <Trash className="mr-2 text-zinc-500" size={18} /> Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Flag className="mr-2 text-zinc-500" size={18} />
              Status
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  disabled={member?.role === VIEWER}
                  onClick={() => handleFeedbackStatus(RESOLVED)}
                >
                  Resolved
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={member?.role === VIEWER}
                  onClick={() => handleFeedbackStatus(PENDING)}
                >
                  Pending
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
