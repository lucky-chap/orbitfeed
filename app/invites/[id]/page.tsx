"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuthActions } from "@convex-dev/auth/react";
import { UsersIcon } from "@heroicons/react/20/solid";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { Loader, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function Invite() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuthActions();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentUrl = pathname + searchParams.toString();
  const inviteId = pathname.split("/invites/")[1];
  const senderId = searchParams.get("senderId");
  const teamId = searchParams.get("teamId");

  console.log("Current url: ", currentUrl);
  console.log("Invite id: ", inviteId);
  console.log("Sender id: ", senderId);
  console.log("Team id: ", teamId);

  const user = useQuery(api.user.viewer);
  const sender = useQuery(api.user.getUser, {
    id: senderId as Id<"users">,
  });
  const invite = useQuery(api.app.invites.getInvite, {
    recipientEmail: user?.email as string,
    senderEmail: sender?.email as string,
  });
  const team = useQuery(api.app.teams.fetchSingleTeam, {
    id: teamId as Id<"teams">,
  });
  const isInviteExpired =
    invite && invite?._creationTime < Date.now() - 24 * 60 * 60 * 1000;
  const addMemberMutation = useMutation(api.app.members.addMemberToTeam);
  const removeInviteMutation = useMutation(api.app.invites.removeInvite);

  const handleAcceptInvite = async () => {
    setLoading(true);
    // Add user to team
    const memberId = await addMemberMutation({
      memberId: user?._id as Id<"users">,
      role: invite?.recipientRole as string,
      teamId: team?._id as Id<"teams">,
    });
    if (memberId !== null) {
      // Remove invite
      const removed = await removeInviteMutation({
        inviteId: invite?._id as Id<"invites">,
      });
      if (removed !== null) {
        toast({
          title: "Success",
          description: `You were added to team ${team?.name}!`,
        });
        setTimeout(() => {
          router.push("/orbits");
        }, 1000);
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Failed to add you to team",
          description: "Please try again later",
        });
      }
    }
  };

  console.log("Sender: ", sender);
  console.log("Invite: ", invite);
  console.log("Team: ", team);
  console.log("Is invite expired: ", isInviteExpired);

  // 1. Check if invite is still valid
  // 2. Check if team id is valid
  // 3. check if sender id is valid
  // 4. If the user is logged in, check if their email matches the recipient email
  // 5. Fetch team using id from invite data from database
  // 6. When adding recipient, check if they are already part of the team before adding

  return (
    <>
      {invite === undefined &&
        team === undefined &&
        sender === undefined &&
        isInviteExpired === undefined && (
          <div className="flex min-h-screen items-center justify-center text-center">
            <Loader className="h-6 w-6 animate-spin text-zinc-400" />
          </div>
        )}
      {invite === null && isInviteExpired === null && (
        <div className="">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl shadow-black/5 ring-1 ring-zinc-200/50 transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <X aria-hidden="true" className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      Invalid invite
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Invalid invite link. Please login or check the link and
                        try again
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {invite !== null && invite !== undefined && isInviteExpired && (
        <div className="">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl shadow-black/5 ring-1 ring-zinc-200/50 transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <X aria-hidden="true" className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      Invite expired
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        The invite link has expired. Please ask the sender to
                        send a new invite
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {invite !== null &&
        invite !== undefined &&
        team !== null &&
        team !== undefined &&
        sender !== null &&
        sender !== undefined &&
        isInviteExpired == false && (
          <div className="">
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl shadow-black/5 ring-1 ring-zinc-200/50 transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <UsersIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-green-600"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <h3 className="text-base font-semibold leading-6 text-gray-900">
                        Invite
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          <span className="font-medium text-zinc-800">
                            {sender.name} ({sender.email})
                          </span>{" "}
                          has invited you to join team{" "}
                          <span className="font-medium text-zinc-800">
                            {team.name}
                          </span>{" "}
                          on Orbitfeed
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <Authenticated>
                      <Button
                        disabled={loading}
                        onClick={handleAcceptInvite}
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {loading && (
                          <Loader className="mr-1 h-5 w-5 animate-spin text-zinc-200" />
                        )}
                        {loading ? "Adding you to team" : "Accept invite"}
                      </Button>
                    </Authenticated>
                    <Unauthenticated>
                      <Button
                        onClick={() => void signIn("github")}
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Lgoin to accept invite
                      </Button>
                    </Unauthenticated>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
