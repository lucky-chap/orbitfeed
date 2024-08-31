"use client";

import React from "react";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import {
  CheckIcon,
  CreditCard,
  House,
  Info,
  LogOut,
  Plus,
  Settings,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import Signout from "@/components/signout";

const links = [
  {
    title: "Orbits",
    href: "/orbits",
    icon: House,
    active: true,
  },
  {
    title: "Billing",
    href: "/billing",
    icon: CreditCard,
    active: false,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
    active: false,
  },
  {
    title: "Create orbit",
    href: "/create",
    icon: Plus,
    active: false,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    active: false,
  },
];

const features = [
  "Unlimited feedback for each orbit",
  "Free entry to annual conference",
  "Free future updates",
  "24/7 Customer Support",
];

export default function Home({ children }: { children: React.ReactNode }) {
  const user = useQuery(api.user.viewer);

  const proUser = useQuery(api.proUsers.checkIfUserIsPro, {
    userId: user?._id as Id<"users">,
    email: user?.email as string,
  });
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="grid grid-cols-[250px_1fr]">
        <div className="sticky top-0 flex h-[100vh] flex-col p-4 py-4">
          <Logo />
          <div className="flex h-full flex-col justify-between">
            {/* <h4 className="text-zinc-100 font-medium">Activity</h4> */}
            <ul className="mt-6">
              {links.map((link, index) => (
                <Link key={index} href={link.href}>
                  <li
                    className={cn(
                      "my-3 flex min-w-6 items-center rounded-lg p-2 font-bold text-zinc-600 transition-all duration-100 ease-linear hover:bg-zinc-100 hover:text-zinc-900",
                      link.active && "bg-zinc-100 text-zinc-900"
                    )}
                  >
                    <link.icon size={20} />
                    <p className="pl-2">{link.title}</p>
                  </li>
                </Link>
              ))}
            </ul>
            <div className="flex flex-col">
              {proUser === null && (
                <div className="rounded-md p-2 text-xs shadow ring-1 ring-zinc-200">
                  <p className="text-zinc-00 pb-2">
                    <Info
                      aria-hidden="true"
                      className="mb-2 h-6 w-5 flex-none font-medium text-blue-600"
                    />
                    Want to get rid of this annoying banner? Upgrade to Pro to
                    get more features like:
                  </p>
                  <ul className="flex flex-col pb-10">
                    {features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-x-3 py-1 text-zinc-500"
                      >
                        <CheckIcon
                          aria-hidden="true"
                          className="h-6 w-5 flex-none text-blue-600"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/billing">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600">
                      Upgrade
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="min-h-screen border-l bg-white px-10 py-4 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
