"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated } from "convex/react";

import Logo from "./logo";
import { Button } from "./ui/button";

export default function Header() {
  const { signOut } = useAuthActions();
  const router = useRouter();

  return (
    <header className="bg-transparent">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-2 sm:p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 flex items-center p-1.5">
            <Logo />
          </Link>
        </div>

        <div className="">
          <Authenticated>
            <Button
              onClick={() => {
                void signOut();
                router.refresh();
              }}
              className="btn w-full rounded-lg bg-white p-2 px-4 text-gray-800 shadow hover:bg-gray-50 sm:ml-4 sm:w-auto"
            >
              Log out
            </Button>
          </Authenticated>
        </div>
      </nav>
    </header>
  );
}
