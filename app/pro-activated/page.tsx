"use client";

import React, { useState } from "react";
import Link from "next/link";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

import { Button } from "@/components/ui/button";

export default function ProActivated() {
  const { width, height } = useWindowSize();
  return (
    <section className="min-h-screen">
      {/* <Confetti width={width} height={height} /> */}
      <div className="flex min-h-screen flex-1 flex-col items-center justify-center px-6 py-12 align-middle lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="mt-10 text-center">
            <p className="my-3 text-base">
              You went pro! We appreciate you for purchasing our pro plan.
            </p>
            <Link href={"/orbits"}>
              <Button
                variant={"default"}
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Go to Orbits
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
