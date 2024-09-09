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
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePaginatedQuery, useQuery } from "convex/react";
import { House, Loader, Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import TimeAgo from "react-timeago";
import { z } from "zod";

import { ACTIVE, PAUSED } from "@/lib/constants";
import { classNames } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Empty from "@/components/empty";
import OrbitList from "@/components/orbit-list";
import Active from "@/components/pills/active";
import Paused from "@/components/pills/paused";

const FormSchema = z.object({
  search_term: z.string().min(2, {
    message: "",
  }),
});

export default function Team({ params }: { params: { id: string } }) {
  const user = useQuery(api.user.viewer);
  const team = useQuery(api.app.teams.fetchSingleTeam, {
    id: params.id as any,
  });

  const allTeams = useQuery(api.app.teams.fetchTeams, {
    userId: user?._id as Id<"users">,
    user_email: user?.email as string,
  });

  console.log("Team: ", team);
  console.log("All teams: ", allTeams);

  const [searchTerm, setSearchTerm] = useState("");

  const teamOrbits = useQuery(api.app.orbits.fetchOrbitsForTeam, {
    teamId: team?._id as Id<"teams">,
  });

  console.log("Orbits for team: ", teamOrbits);

  const {
    results,
    status,
    loadMore,
    isLoading: paginatedLoading,
  } = usePaginatedQuery(
    api.app.orbits.fetchOrbits,
    {
      userId: user?._id,
      user_email: user?.email,
    },
    { initialNumItems: 10 }
  );

  // console.log("Results: ", results)
  // console.log("Userid: ", user?._id)

  const {
    results: searchResults,
    status: searchStatus,
    loadMore: searchLoadMore,
    isLoading: searchLoading,
  } = usePaginatedQuery(
    api.app.orbits.searchOrbits,
    {
      userId: user?._id,
      searchTerm: searchTerm,
    },
    { initialNumItems: 10 }
  );

  // console.log("Results: ", results);
  // console.log("Search results: ", searchResults);

  return (
    <div>
      {team == undefined ? (
        <div className="mx-auto flex min-h-[10vh] max-w-sm flex-col justify-center px-3 pl-40">
          <Loader className="h-7 w-7 animate-spin text-zinc-400" />
        </div>
      ) : (
        <header className="flex items-center justify-between border-b border-black/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <h1 className="text-base font-semibold leading-7">
            Team {team.name}
          </h1>
          <Button className="bg-blue-500 hover:bg-blue-600">
            Add new members
          </Button>
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
          <p className="text-zinc-500">
            Try creating a new orbit and add to team
          </p>
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
