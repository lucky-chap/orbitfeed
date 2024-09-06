"use client";

import React, { useState } from "react";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { Camera, Image, LoaderCircle, UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { EVERYDAY, ONEC_A_WEEK, THRICE_A_WEEK } from "@/lib/constants";
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
  website: z.string().url({
    message: "Please enter a valid website",
  }),
});

export default function CreateOrbit() {
  const user = useQuery(api.user.viewer);

  const createNewOrbit = useMutation(api.app.orbits.createOrbit);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      website: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      const orbitId = await createNewOrbit({
        name: data.name,
        userEmail: user?.email as string,
        website: data.website,
      });
      if (orbitId != null) {
        setLoading(false);
        toast({
          variant: "default",
          title: "New orbit created.",
          description: "Find it in /orbits",
        });
        form.reset();
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Your orbit was not created.",
        });
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Orbit creation failed.",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form
        className="mx-auto max-w-xl px-2 py-12"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-12">
          <div className="border- border-gray-900/10 pb-12">
            <h2 className="text-3xl font-semibold leading-7 text-gray-900">
              Create a new Orbit
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Receive feedback from your project with a new orbit.
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
                        placeholder="Paladin"
                        {...field}
                        disabled={loading}
                        className="placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-500 sm:col-span-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://orbitfeed.lol"
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

        <div className="mt-12 flex items-center justify-between gap-x-6">
          <Link href={"/orbits"} className="w-full">
            <Button variant={"outline"} className="w-full">
              Cancel
            </Button>
          </Link>
          <Button
            onClick={() => form.handleSubmit(onSubmit)}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            {loading ? (
              <LoaderCircle className="animate-spin duration-700" />
            ) : (
              "Create new orbit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
