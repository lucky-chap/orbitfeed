"use client";

import { useState } from "react";
import Link from "next/link";
import { Braces, ChartArea, Github, PhoneIcon, PlayCircle } from "lucide-react";

import Logo from "./logo";
import { Button } from "./ui/button";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartArea,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: ChartArea,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: ChartArea,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: ChartArea,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ChartArea,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircle },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-transparent">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-2 sm:p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="#" className="-m-1.5 flex items-center p-1.5">
            <span className="sr-only">Your Company</span>
            <Logo />
            <p className="ml-1 text-base font-semibold">OrbitFeed</p>
          </Link>
        </div>

        <div className="">
          <Button variant={"outline"} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 sm:mr-2"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span className="hidden sm:block">Source Code</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}
