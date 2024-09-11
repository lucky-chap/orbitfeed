"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuthActions } from "@convex-dev/auth/react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import {
  Cog6ToothIcon,
  CurrencyDollarIcon,
  FolderIcon,
  GlobeAltIcon,
  PlusCircleIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "convex/react";
import { Loader } from "lucide-react";

import { classNames } from "@/lib/utils";
import Logo from "@/components/logo";

const navigation = [
  { name: "Orbits", href: "/orbits", icon: FolderIcon, pathname: "orbits" },
  // { name: "Deployments", href: "#", icon: ServerIcon, pathname: true },
  {
    name: "Create orbit",
    href: "/create",
    icon: PlusCircleIcon,
    pathname: "create",
  },
  {
    name: "Create team",
    href: "/new-team",
    icon: UsersIcon,
    pathname: "new-team",
  },
  {
    name: "Billing",
    href: "/billing",
    icon: CurrencyDollarIcon,
    pathname: "billing",
  },
  {
    name: "Domains",
    href: "/domains",
    icon: GlobeAltIcon,
    pathname: "domains",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Cog6ToothIcon,
    pathname: "settings",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useQuery(api.user.viewer);
  const allTeams = useQuery(api.app.teams.fetchTeams, {
    userId: user?._id as Id<"users">,
    user_email: user?.email as string,
  });

  console.log("All Teams: ", allTeams);

  const { signOut } = useAuthActions();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();

  const path = pathname.split("/")[1];
  const teamPath = pathname.split("/")[2];

  const router = useRouter();

  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 xl:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-50 px-6 ring-1 ring-black/10">
                <div className="flex h-16 shrink-0 items-center">
                  <Logo />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              onClick={() => setSidebarOpen(false)}
                              href={item.href}
                              className={classNames(
                                item.pathname === path
                                  ? "bg-transparent text-indigo-600"
                                  : "text-gray-800 hover:bg-gray-100 hover:text-indigo-600",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className="h-6 w-6 shrink-0"
                              />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    {user == undefined && allTeams == undefined ? (
                      <Loader className="h-6 w-6 animate-spin text-zinc-400" />
                    ) : (
                      <>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-700">
                            Your teams
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {allTeams?.map((team) => (
                              <li key={team._id}>
                                <Link
                                  href={`/teams/${team._id}`}
                                  className={classNames(
                                    teamPath === team._id
                                      ? "bg-transparent text-indigo-600"
                                      : "text-gray-800 hover:bg-gray-100 hover:text-indigo-600",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-gray-100 text-[0.625rem] font-medium group-hover:text-indigo-600">
                                    {team.name.charAt(0).toUpperCase()}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li
                          className="-mx-6 mt-auto cursor-pointer"
                          onClick={() => {
                            void signOut();
                            router.push("/");
                          }}
                          onMouseEnter={() => setHovered(true)}
                          onMouseLeave={() => setHovered(false)}
                        >
                          <span className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-800 hover:bg-gray-100">
                            <Image
                              src={
                                user?.image ??
                                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              }
                              alt="profile"
                              width={24}
                              height={24}
                              className="h-6 w-6 rounded-full bg-gray-50"
                            />
                            <span className="sr-only"> Your profile</span>
                            <span aria-hidden="true">
                              {hovered ? "Logout" : user?.name}
                            </span>
                          </span>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-50 px-6 ring-1 ring-black/5">
            <div className="flex h-16 shrink-0 items-center">
              <Logo />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          onClick={() => setSidebarOpen(false)}
                          href={item.href}
                          className={classNames(
                            item.pathname === path
                              ? "bg-transparent text-indigo-600"
                              : "text-gray-800 hover:bg-gray-100 hover:text-indigo-600",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className="h-6 w-6 shrink-0"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {user == undefined && allTeams == undefined ? (
                  <Loader className="h-6 w-6 animate-spin text-zinc-400" />
                ) : (
                  <>
                    <li>
                      <div className="text-xs font-semibold leading-6 text-gray-700">
                        Your teams
                      </div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {allTeams?.map((team) => (
                          <li key={team._id}>
                            <Link
                              href={`/teams/${team._id}`}
                              className={classNames(
                                teamPath === team._id
                                  ? "bg-transparent text-indigo-600"
                                  : "text-gray-800 hover:bg-gray-100 hover:text-indigo-600",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                              )}
                            >
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-gray-100 text-[0.625rem] font-medium group-hover:text-indigo-600">
                                {team.name.charAt(0).toUpperCase()}
                              </span>
                              <span className="truncate">{team.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li
                      className="-mx-6 mt-auto cursor-pointer"
                      onClick={() => {
                        void signOut();
                        router.push("/");
                      }}
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                    >
                      <span className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-800 hover:bg-gray-100">
                        <Image
                          src={
                            user?.image ??
                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          }
                          alt="profile"
                          width={24}
                          height={24}
                          className="h-6 w-6 rounded-full bg-gray-50"
                        />
                        <span className="sr-only"> Your profile</span>
                        <span aria-hidden="true">
                          {hovered ? "Logout" : user?.name}
                        </span>
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>

        <div className="xl:pl-72">
          <main className="">
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 px-4 sm:px-6 lg:hidden lg:px-8">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="-m-2.5 p-2.5 text-gray-900 xl:hidden"
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
