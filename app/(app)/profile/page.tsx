"use client";

import React, { useState } from "react";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Label } from "@radix-ui/react-label";
import { useQuery } from "convex/react";
import { LoaderCircle, Pencil } from "lucide-react";
import TimeAgo from "react-timeago";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Profile() {
  const user = useQuery(api.user.viewer);
  const account = useQuery(api.user.account, {
    userId: user?._id as Id<"users">,
  });

  const [name, setName] = useState(user?.name);
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-blue-00 mx-auto flex h-full max-w-xl flex-col items-center justify-center pl-0 text-center">
      {user?.image && (
        <div className="relative rounded-full ring-4 ring-zinc-200">
          <Image
            src={user?.image as string}
            alt="Profile"
            width={200}
            height={200}
            className="rounded-full object-cover"
          />
          {/* <Button variant={"outline"} className="">
              <Pencil size={16} />
            </Button> */}

          <div className="flex w-full items-center justify-center"></div>
        </div>
      )}
      {user?.name && (
        <div className="w-full text-left">
          <Label className="font-medium">Name</Label>
          <Input
            defaultValue={user.name}
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            className="mt-1 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500"
            disabled
          />
        </div>
      )}
      {user?.email && (
        <div className="my-4 w-full text-left">
          <Label className="font-medium">Email</Label>
          <Input
            defaultValue={user.email}
            className="mt-1 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500"
            disabled
          />
        </div>
      )}
      {account?.provider && (
        <div className="mb-4 w-full text-left">
          <Label className="font-medium">Provider</Label>
          <Input
            defaultValue={
              account.provider.charAt(0).toUpperCase() +
              account.provider.slice(1)
            }
            className="mt-1 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500"
            disabled
          />
        </div>
      )}

      {/* <div className="mt-2 w-full text-left">
        <p className="mb-2 font-medium">Picture</p>
        <label
          htmlFor="dropzone-file"
          className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div> */}

      <Button
        // disabled={loading || user?.name === name}
        variant={"destructive"}
        className="mt-10 w-full"
      >
        {/* {loading ? (
          <LoaderCircle className="animate-spin duration-700" />
        ) : (
          "Update"
        )} */}
        Logout
      </Button>
    </div>
  );
}
