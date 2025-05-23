"use client";

import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery } from "convex/react";
import { Loader } from "lucide-react";

import { IMember, IParticipant, ITeam } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "./ui/use-toast";

export function InviteDialog({
  team,
  participants,
}: {
  team: ITeam | undefined | null;
  participants: IMember[] | undefined;
}) {
  const user = useQuery(api.v1.user.viewer);
  const createInviteMutation = useMutation(api.v1.invites.createInvite);
  const [loading, setLoading] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientRole, setRecipientRole] = useState("");

  const handleSendInvite = async () => {
    if (recipientEmail.trim().length === 0 || !recipientEmail.includes("@")) {
      toast({
        variant: "destructive",
        title: "Recipient email is required",
        description: "Please enter a valid email address",
      });
    } else if (recipientRole.trim().length === 0) {
      toast({
        variant: "destructive",
        title: "Role is required",
        description: "Please select a role",
      });
    } else if (recipientEmail.trim() === user?.email) {
      toast({
        variant: "destructive",
        title: "Recipient email is invalid",
        description: "You can't send an invite to yourself",
      });
    } else {
      setLoading(true);
      // create an invite to get the inviteid
      const inviteId = await createInviteMutation({
        recipientEmail,
        role: recipientRole,
        senderEmail: user?.email as string,
        teamId: team?._id as Id<"teams">,
      });
      if (inviteId !== null) {
        await fetch("/api/invite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inviteId: inviteId as Id<"invites">,
            recipientEmail,
            senderId: user?._id as Id<"users">,
            senderName: user?.name as string,
            senderEmail: user?.email as string,
            teamId: team?._id as Id<"teams">,
            teamName: team?.name as string,
          }),
        })
          .then((res) => {
            if (res.ok) {
              setLoading(false);
              toast({
                title: "Invite sent",
                description: `An invite has been sent to ${recipientEmail}`,
              });
              setRecipientEmail("");
              return res.json();
            } else {
              setLoading(false);
              toast({
                variant: "destructive",
                title: "Failed to send invite",
                description: "Please try again later",
              });
            }
          })
          .then((data) => {
            console.log(data);
          });
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Failed to create invite",
          description: "Please try again later",
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={(participants?.length ?? 0) >= 6}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <PlusCircleIcon className="mr-1 h-5 w-5" />
          Send invite
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New invite</DialogTitle>
          <DialogDescription>
            Invite someone to join your team by entering their email address
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="recipientEmail">Recipient email</Label>
            <Input
              id="recipientEmail"
              disabled={loading}
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="mb-4"
            />
            <Label htmlFor="role">Role</Label>
            <Select
              disabled={loading}
              onValueChange={(value) => setRecipientRole(value)}
            >
              <SelectTrigger className="w-full focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button
            disabled={loading || (participants?.length ?? 0) > 6}
            onClick={handleSendInvite}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {loading && (
              <Loader className="mr-1 h-5 w-5 animate-spin text-zinc-200" />
            )}
            {loading ? "Sending invite" : "Send invite"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
