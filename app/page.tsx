"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import love from "@/public/images/project-app-screenshot.png";
import { useAuthActions } from "@convex-dev/auth/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Header from "@/components/header";

export default function Home() {
  const { signIn } = useAuthActions();
  return (
    <div className="background">
      <div className="mx-auto h-screen max-w-7xl overflow-y-hidden bg-transparent text-black">
        <Header />
        <div className="mx-auto grid max-w-5xl place-content-center px-2 pt-28 text-center">
          <h2 className="text-4xl font-semibold text-zinc-600 lg:text-6xl">
            Ready for SaaS Websites Crafted by TailGrids
          </h2>
          <p className="mx-auto max-w-xl px-1 py-12 text-xl text-zinc-600">
            Example Template for SaaS, Software, and App Landing Page. Crafted
            with TailGrids UI Components by TailGrids Team
          </p>
          <div className="flex flex-col items-center justify-center pb-12 sm:flex-row">
            <Button className="w-full bg-blue-500 transition-all duration-150 ease-linear hover:bg-blue-600 sm:w-auto">
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
                className="mr-2 h-5 w-5"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              Login with Github
            </Button>
            <Button className="ml-2 mt-2 flex w-full items-center bg-white text-black transition-all duration-150 ease-linear hover:bg-zinc-50 sm:mt-0 sm:w-auto">
              Learn more
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="mx-auto w-full max-w-7xl shadow">
            <Image src={love} alt="Banner" className="rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
