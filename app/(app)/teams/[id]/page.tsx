"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Avatar01 from "@/public/images/avatar-01.webp";
import Avatar02 from "@/public/images/avatar-02.webp";
import Avatar03 from "@/public/images/avatar-03.webp";
import Avatar04 from "@/public/images/avatar-04.webp";
import Avatar05 from "@/public/images/avatar-05.webp";
import { usePaginatedQuery, useQuery } from "convex/react";
import { House, Loader, Loader2, Pencil, Plus, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InviteDialog } from "@/components/invite-dialog";
import MembersSheet from "@/components/members-sheet";
import OrbitList from "@/components/orbit-list";
import TeamSettings from "@/components/team-settings";

export default function Team({ params }: { params: { id: string } }) {
  const user = useQuery(api.user.viewer);
  const team = useQuery(api.app.teams.fetchSingleTeam, {
    id: params.id as any,
  });

  const teams = useQuery(api.app.teams.fetchTeams, {
    userId: user?._id as Id<"users">,
    user_email: user?.email as string,
  });

  const participants = useQuery(api.app.members.getMembersForTeam, {
    teamId: team?._id as Id<"teams">,
  });

  console.log("Members for this team: ", participants);

  const teamOrbits = useQuery(api.app.orbits.fetchOrbitsForTeam, {
    teamId: team?._id as Id<"teams">,
  });

  return (
    <div>
      {team == undefined ? (
        <div className="mx-auto flex min-h-[10vh] max-w-sm flex-col justify-center px-3 pl-40">
          <Loader className="h-7 w-7 animate-spin text-zinc-400" />
        </div>
      ) : (
        <header className="flex items-center justify-between border-b border-black/5 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold leading-7">
              Team {team.name}
            </h1>
            {team.leader === user?._id && <TeamSettings team={team} />}
          </div>
          <div className="flex items-center">
            <div className="-mx-0.5 mr-3 flex justify-center -space-x-3">
              <MembersSheet participants={participants} team={team} />
              {/* {participants?.map((participant) => (
                <Image
                  key={participant._id}
                  className="box-content rounded-full border-2 border-gray-100"
                  src={participant.image as string}
                  width={24}
                  height={24}
                  alt="participant avatar"
                />
              ))} */}
            </div>
            {user?._id === team.leader && <InviteDialog team={team} />}
          </div>
        </header>
      )}

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
          <p className="text-zinc-500">Try moving an orbit to team</p>
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
