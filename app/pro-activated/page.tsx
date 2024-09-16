"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader } from "lucide-react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

import { Button } from "@/components/ui/button";

export default function ProActivated() {
  const [paramsIsNull, setParamIsNull] = useState(false);
  const { width, height } = useWindowSize();
  const searchParams = useSearchParams();
  const [invalidId, setInvalidId] = useState(false);
  const user = useQuery(api.v1.user.viewer);

  const proUser = useQuery(api.v1.proUsers.checkIfUserIsPro, {
    userId: user?._id as Id<"users">,
    email: user?.email as string,
  });

  const user_id = searchParams.get("user_id"); // can be null
  console.log("user_id", user_id);
  console.log("typeof", typeof user_id as Id<"users">);

  useEffect(() => {
    if (!user_id) {
      setParamIsNull(true);
    } else if (user?._id !== user_id) {
      setInvalidId(true);
    }
  }, [user_id]);

  console.log("User data: ", proUser);

  return (
    <section className="min-h-screen">
      {paramsIsNull ||
        user?._id !== user_id ||
        user_id === null ||
        (proUser === null && (
          <div className="flex min-h-screen flex-1 flex-col items-center justify-center px-6 py-12 align-middle lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="mt-10 text-center">
                <p className="py-2">You are not on our pro plan yet.</p>
                <Link href={"/billing"}>
                  <Button
                    variant={"default"}
                    className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Go Pro
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}

      {user?._id === user_id &&
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
                    We sent a special email to{" "}
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

      {proUser !== null && proUser == undefined && (
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
