"use client";

import React, { useState } from "react";
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
import demo from "@/public/images/thank-you.png";
import { useMutation, usePaginatedQuery, useQuery } from "convex/react";
import {
  House,
  Loader,
  Loader2,
  Pencil,
  Plus,
  Settings,
  TriangleAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { InviteDialog } from "@/components/invite-dialog";
import MembersSheet from "@/components/members-sheet";
import OrbitList from "@/components/orbit-list";
import TeamSettings from "@/components/team-settings";

export default function Team({ params }: { params: { id: string } }) {
  const router = useRouter();
  const user = useQuery(api.v1.user.viewer);
  const [loading, setLoading] = useState(false);
  const team = useQuery(api.v1.teams.fetchSingleTeam, {
    id: params.id as Id<"teams">,
  });

  const teams = useQuery(api.v1.teams.fetchTeams, {
    userId: user?._id as Id<"users">,
    user_email: user?.email as string,
  });

  const leaveTeamMutation = useMutation(api.v1.members.removeMemberFromTeam);

  const participants = useQuery(api.v1.members.getMembersForTeam, {
    teamId: params.id as Id<"teams">,
  });

  console.log("Members for this team: ", participants);

  const teamOrbits = useQuery(api.v1.orbits.fetchOrbitsForTeam, {
    teamId: params.id as Id<"teams">,
  });

  const handleLeaveTeam = async (memberId: Id<"users">) => {
    if (memberId !== undefined) {
      setLoading(true);
      const result = await leaveTeamMutation({
        teamId: team?._id as Id<"teams">,
        memberId: memberId,
      });
      if (result === "deleted") {
        setLoading(false);
        router.push("/orbits");
        toast({
          title: "Success!",
          description: "You left this team",
        });
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error!",
          description: "You could not be removed from team",
        });
      }
    }
  };

  console.log("Current team");

  return (
    <div>
      {team === undefined && (
        <div className="mx-auto mt-5 flex max-w-sm flex-col justify-center px-3 pl-40">
          <Loader className="h-7 w-7 animate-spin text-zinc-400" />
        </div>
      )}
      {team !== undefined && (
        <header className="flex items-center justify-between border-b border-black/5 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold leading-7">
              Team {team?.name}
            </h1>
            {/* {team?.leader === user?._id && <TeamSettings team={team} />} */}
          </div>
          {team === null && (
            <div className="flex items-center">
              <TriangleAlert className="mr-1 h-6 w-6 text-amber-500" />
              <p className="text-amber-500">Team does not exist anymore!</p>
            </div>
          )}
          <div className="flex items-center">
            <MembersSheet participants={participants} team={team} />
            {user?._id === team?.leader && (
              <InviteDialog team={team} participants={participants} />
            )}
            {user?._id !== team?.leader && team !== null && (
              <Button
                variant={"secondary"}
                disabled={loading}
                onClick={() => handleLeaveTeam(user?._id as Id<"users">)}
              >
                {loading ? "Leaving team..." : "Leave team"}
              </Button>
            )}
          </div>
        </header>
      )}

      {/* <div className="">
        <Image
          src={demo}
          alt="Banner"
          width={900}
          height={200}
          className="h-52 w-full object-cover"
        />
      </div> */}

      {/* Orbit list */}
      <OrbitList
        results={teamOrbits}
        searchTerm=""
        isTeamRoute={true}
        teamId={team?._id}
      />

      {teamOrbits !== undefined && teamOrbits?.length === 0 && (
        <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-3 text-center">
          <h2 className="text-lg font-medium">No orbits for this team</h2>
          {team?.leader === user?._id && (
            <p className="text-zinc-500">Try moving an orbit to team</p>
          )}
          {team?.leader !== user?._id && (
            <p className="text-zinc-500">
              Orbits appear here when team leader moves them here
            </p>
          )}
        </div>
      )}
      {teamOrbits == undefined && (
        <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center px-3 pl-40">
          <Loader className="h-7 w-7 animate-spin text-zinc-400" />
        </div>
      )}
    </div>
  );
}
