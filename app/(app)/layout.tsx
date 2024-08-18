"use client"

import React from "react"
import Link from "next/link"
import { CreditCard, House, LogOut, Plus, Settings, User } from "lucide-react"

import { cn } from "@/lib/utils"
import Logo from "@/components/logo"

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
  {
    title: "Logout",
    href: "/logout",
    icon: LogOut,
    active: false,
  },
]

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="grid grid-cols-[250px_1fr]">
        <div className="sticky top-0 flex h-[100vh] flex-col p-4 py-4">
          <Logo />
          <div className="flex flex-col">
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
          </div>
        </div>
        <div className="min-h-screen border-l bg-white px-10 py-4 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  )
}
