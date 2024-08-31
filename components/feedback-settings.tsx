"use client";

import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import saveAs from "file-saver";
import { Download, Ellipsis, Flag, Trash } from "lucide-react";

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

export function FeedbackSettings({
  feedbackId,
  imageUrl,
  deleteFeedback,
}: {
  feedbackId: Id<"feedback">;
  imageUrl: string;

  deleteFeedback: (id: Id<"feedback">) => void;
}) {
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-5 p-2 text-xs">
          <Ellipsis size={20} className="text-zinc-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <DropdownMenuItem
            // disabled={res?.find((r) => r.id === feedbackId)?.url == null}
            disabled={res?.find((r) => r.id === feedbackId)?.url == null}
            onClick={() =>
              handleDownloadFile(
                feedbackId,
                res?.find((r) => r.id === feedbackId)?.url as string
              )
            }
          >
            <Download className="mr-2 text-zinc-500" size={18} />{" "}
            {res?.find((r) => r.id === feedbackId)?.url !== null
              ? "Download image"
              : "No image"}
          </DropdownMenuItem> */}
          <>
            {/* {res?.find((r) => r.id === feedbackId)?.url !== null && (
              <DropdownMenuItem
                // disabled={res?.find((r) => r.id === feedbackId)?.url == null}
                onClick={() =>
                  handleDownloadFile(
                    feedbackId,
                    res?.find((r) => r.id === feedbackId)?.url as string
                  )
                }
              >
                <Download className="mr-2 text-zinc-500" size={18} />{" "}
                {res?.find((r) => r.id === feedbackId)?.url !== null
                  ? "Download image"
                  : "No image"}
              </DropdownMenuItem>
            )} */}
            <DropdownMenuItem
              // disabled={res?.find((r) => r.id === feedbackId)?.url == null}
              // check serveFile mutation and what it returns.

              disabled={imageUrl.trim().length == 0 || imageUrl === "no_image"}
              onClick={() => handleDownloadFile(feedbackId, imageUrl)}
            >
              <Download className="mr-2 text-zinc-500" size={18} />{" "}
              {imageUrl.trim().length > 0 ? "Download image" : "No image"}
            </DropdownMenuItem>
          </>
          <DropdownMenuItem onClick={() => deleteFeedback(feedbackId)}>
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
                <DropdownMenuItem>Resolved</DropdownMenuItem>
                <DropdownMenuItem>Pending</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
