"use client";

import React, { useState } from "react";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuthActions } from "@convex-dev/auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { Camera, Image, Loader, LoaderCircle, UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  name: z.string().min(4, {
    message: "Please enter a name with at least 4 characters",
  }),
});

export default function CreateOrbit() {
  const user = useQuery(api.user.viewer);

  const proUser = useQuery(api.proUsers.checkIfUserIsPro, {
    userId: user?._id as Id<"users">,
    email: user?.email as string,
  });

  const teams = useQuery(api.app.teams.fetchTeams, {
    userId: user?._id as Id<"users">,
    user_email: user?.email as string,
  });

  const createNewTeam = useMutation(api.app.teams.createTeam);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      const orbitId = await createNewTeam({
        name: data.name,
        leader: user?._id as Id<"users">,
      });
      if (orbitId != null) {
        setLoading(false);
        toast({
          variant: "default",
          title: "New team created.",
          description: "Find it in your teams list.",
        });
        form.reset();
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Your team was not created.",
        });
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Team creation failed.",
        });
      }
    }
  }

  return (
    <div className="">
      {proUser !== undefined && proUser == null && (
        <Link
          href={"/billing"}
          className="flex w-full items-center justify-center bg-indigo-400 px-1 py-1 shadow shadow-purple-50/25"
        >
          <p className="text-xs text-white">
            Upgrade to pro to create a new team
          </p>
        </Link>
      )}
      {teams !== undefined && teams?.length >= 6 && (
        <Link
          href={"/billing"}
          className="flex w-full items-center justify-center bg-indigo-400 px-1 py-1 shadow shadow-purple-50/25"
        >
          <p className="text-xs text-white">
            You have reached maximum number of teams for PRO.
          </p>
        </Link>
      )}
      <Form {...form}>
        <form
          className="mx-auto max-w-xl px-2 py-24 lg:py-64"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-12">
            <div className="border- border-gray-900/10 pb-12">
              <h2 className="text-3xl font-semibold leading-7 text-gray-900">
                Create a new team
              </h2>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                Create new team to add other members and manage your orbits. A
                team can have a maximum of 6 members.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Akatsuki"
                          {...field}
                          disabled={loading}
                          className="placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500 sm:col-span-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {proUser === undefined ||
            (teams === undefined && (
              <div className="flex w-full items-center justify-center">
                <Loader className="h-6 w-6 animate-spin text-zinc-400" />
              </div>
            ))}

          {proUser === null && (
            <Link href={"/billing"} className="w-full">
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                Ugrade to pro
              </Button>
            </Link>
          )}

          {proUser !== null && proUser !== undefined && (
            <div className="mt-12 flex items-center justify-between gap-x-6">
              <Link href={"/orbits"} className="w-full">
                <Button variant={"outline"} className="w-full">
                  Cancel
                </Button>
              </Link>
              <Button
                onClick={() => form.handleSubmit(onSubmit)}
                disabled={loading || (teams?.length ?? 0) >= 6}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                {loading ? (
                  <LoaderCircle className="animate-spin duration-700" />
                ) : (
                  "Create new team"
                )}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
