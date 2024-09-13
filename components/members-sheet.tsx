"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Avatar02 from "@/public/images/avatar-02.webp";
import { useMutation, useQuery } from "convex/react";

import { IMember, IParticipant, ITeam, IUser } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { DialogDescription } from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "./ui/use-toast";

export default function MembersSheet({
  participants,
  team,
}: {
  participants: IParticipant[] | null | undefined;
  team: ITeam | null | undefined;
}) {
  const user = useQuery(api.user.viewer);
  const [loading, setLoading] = useState(false);
  const updateMemberRoleMutation = useMutation(
    api.app.members.updateMemberRole
  );
  const removeMemberMutation = useMutation(
    api.app.members.removeMemberFromTeam
  );

  const handleUpdateMemberRole = async (
    memberId: Id<"users">,
    role: string
  ) => {
    setLoading(true);
    const result = await updateMemberRoleMutation({
      teamId: team?._id as Id<"teams">,
      memberId: memberId,
      role: role,
    });
    if (result !== null) {
      setLoading(false);
      toast({
        title: "Success!",
        description: "Member role has been updated",
      });
    } else {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Member role could not be updated",
      });
    }
  };

  const handleRemoveMember = async (memberId: Id<"users">) => {
    setLoading(true);
    const result = await removeMemberMutation({
      teamId: team?._id as Id<"teams">,
      memberId: memberId,
    });
    if (result === "deleted") {
      setLoading(false);
      toast({
        title: "Success!",
        description: "Member has been removed",
      });
    } else {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Member could not be removed",
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="m-0 border-none p-0 shadow-none hover:bg-transparent"
        >
          {participants?.slice(0, 6).map((participant) => (
            <div
              key={participant._id}
              className="-mx-0.5 mr-3 flex justify-center -space-x-3"
            >
              <Image
                key={participant._id}
                className="box-content rounded-full border-2 border-gray-100"
                src={participant.image as string}
                width={24}
                height={24}
                alt="participant avatar"
              />
            </div>
          ))}
        </Button>
      </SheetTrigger>
      <SheetContent id="sheet">
        <SheetHeader>
          <SheetTitle>Members</SheetTitle>
        </SheetHeader>
        <DialogDescription className="sr-only">
          List of members
        </DialogDescription>
        {participants?.map((participant) => (
          <>
            <div className="my-3" key={participant._id}>
              <div className="flex flex-wrap items-center">
                <Image
                  className="box-content rounded-full border-2 border-gray-100"
                  src={participant.image as string}
                  width={24}
                  height={24}
                  alt="participant avatar"
                />
                <p className="truncate pl-2 font-medium">{participant.name}</p>
                <p className="pl-2">({participant.email})</p>
              </div>
            </div>
            <div className="flex items-center">
              <Button
                disabled={loading || team?.leader !== user?._id}
                onClick={() => handleRemoveMember(participant._id)}
                variant={"outline"}
                className="w-full text-red-500 hover:text-red-500"
              >
                Remove
              </Button>
              <div className="w-4"></div>
              <Select
                disabled={loading || team?.leader !== user?._id}
                onValueChange={(value) => {
                  console.log("Member role: ", value);
                  handleUpdateMemberRole(participant._id, value);
                }}
                defaultValue={participant.role}
              >
                <SelectTrigger className="w-full focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectGroup>
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </>
        ))}
        <SheetFooter className="mt-20">
          <SheetClose asChild>
            <Button variant={"ghost"}>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
