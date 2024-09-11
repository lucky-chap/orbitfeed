"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { usePaginatedQuery, useQuery } from "convex/react";
import { Loader, Loader2 } from "lucide-react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

import { Button } from "@/components/ui/button";

export default function ProActivated() {
  const [paramsIsNull, setParamIsNull] = useState(false);
  const { width, height } = useWindowSize();
  const searchParams = useSearchParams();
  const [invalidId, setInvalidId] = useState(false);
  const user = useQuery(api.user.viewer);

  const proUser = useQuery(api.proUsers.checkIfUserIsPro, {
    // ideally, we'd want to use the orb_ck1 as the userId instead, but since convex validates the
    // values, this would likely cause a 500 internal server error and we wouldn't want our users to
    // see that would we?
    userId: user?._id as Id<"users">,
    email: user?.email as string,
  });

  // orb_ck1 is just a dummy name i gave to this search parameter. it's actually the user's id
  // you can find it defined in /api/checkout
  const orb_ck1 = searchParams.get("orb_ck1"); // can be null
  console.log("ORB_CK1", orb_ck1);
  console.log("typeof", typeof orb_ck1 as Id<"users">);

  useEffect(() => {
    if (!orb_ck1) {
      setParamIsNull(true);
    } else if (user?._id !== orb_ck1) {
      setInvalidId(true);
    }
  }, [orb_ck1]);

  console.log("User data: ", proUser);

  return (
    <section className="min-h-screen">
      {paramsIsNull && user?._id !== orb_ck1 && proUser == null && (
        <div className="flex min-h-screen flex-1 flex-col items-center justify-center px-6 py-12 align-middle lg:px-8">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="mt-10 text-center">
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
      )}

      {user?._id === orb_ck1 &&
        !paramsIsNull &&
        proUser !== undefined &&
        proUser !== null && (
          <>
            <Confetti width={width} height={height} />
            <div className="flex min-h-screen flex-1 flex-col items-center justify-center px-6 py-12 align-middle lg:px-8">
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="mt-10 text-center">
                  <p className="my-3 text-base">
                    You went pro! We appreciate you for purchasing our pro plan.
                    We spent a special email to{" "}
                    <span className="font-medium">{user.email}</span>
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
          </>
        )}

      {user?._id === orb_ck1 && proUser == undefined && (
        <>
          <div className="flex min-h-screen flex-1 flex-col items-center justify-center px-6 py-12 align-middle lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full">
              <div className="mt-10 flex items-center justify-center text-center">
                <Loader
                  className="h-6 w-6 animate-spin text-zinc-400"
                  size={22}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
