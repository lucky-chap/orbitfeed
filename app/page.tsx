"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import banner from "@/public/images/demo.png";
import { useAuthActions } from "@convex-dev/auth/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Authenticated, Unauthenticated } from "convex/react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Hero from "@/components/hero";

export default function Home() {
  const { signIn } = useAuthActions();
  return (
    <div className="">
      <Hero />
    </div>
  );
}
