"use client";

import React, { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  email: z.string().email({
    message: "Please enter a valid email",
  }),
});

export default function Login() {
  const { signIn } = useAuthActions();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      await signIn("resend", data);
      setLoading(false);
      toast({
        variant: "default",
        title: "Magic link sent",
        description: "Check your email for a magic link to sign in.",
      });
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Please try again later.",
        });
      }
    }
  }

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col items-center justify-center px-6 py-12 align-middle lg:px-8">
        {/* <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account to continue
          </h2>
        </div> */}

        <div className="mt- sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <Form {...form}>
            <form
              action="#"
              method="POST"
              className="space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
           
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="orbitfeed@cool.com"
                        {...field}
                        disabled={loading}
                        className="focus-visible:ring-1 focus-visible:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  {loading ? (
                    <LoaderCircle className="animate-spin duration-700" />
                  ) : (
                    "Send magic link"
                  )}
                </button>
              </div>

            
            </form>
          </Form> */}

          <div className="mt-10">
            <button
              onClick={() =>
                void signIn("github", {
                  redirectTo: "/orbits",
                })
              }
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition-all duration-150 ease-linear hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {loading ? (
                <LoaderCircle className="animate-spin duration-700" />
              ) : (
                <p className="flex items-center">
                  <GitHubLogoIcon fontSize={20} className="mr-2" />
                  Login with GitHub
                </p>
              )}
            </button>
          </div>

          {/* <p className="mt-10 text-center text-sm text-gray-500">
            Sign in to access awesome features.{" "}
          </p> */}
        </div>
      </div>
    </>
  );
}
