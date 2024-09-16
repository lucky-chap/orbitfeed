"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import demo from "@/public/images/avatar-01.webp";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProfileDropdown() {
  const user = useQuery(api.v1.user.viewer);
  const router = useRouter();
  const { signOut } = useAuthActions();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-auto rounded-full p-0 ring-2 ring-zinc-400"
        >
          <Image
            src={user?.image ?? demo}
            alt="profile"
            width={24}
            height={24}
            className="h-6 w-6 rounded-full bg-gray-50"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            void signOut();
            router.push("/");
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
