"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { Loader, Loader2, Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ITeam } from "@/lib/types";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

const FormSchema = z.object({
  name: z.string().min(4, {
    message: "Please enter a name with at least 4 characters",
  }),
});

export default function TeamSettings({ team }: { team: ITeam }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const deleteTeamMutation = useMutation(api.v1.teams.deleteTeam);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleDeleteTeam = async () => {
    setLoading(true);
    try {
      const result = await deleteTeamMutation({
        teamId: team._id,
      });
      if (result === "deleted") {
        setLoading(false);
        toast({
          title: "Team deleted",
          description: "Your team has been deleted successfully.",
        });
        router.push("/orbits");
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Team was not deleted.",
        });
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Team deletion failed.",
        });
      }
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"ghost"} className="ml-2">
            <Settings className="h-5 w-5 text-gray-500" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-zinc-700 transition-all duration-100 ease-linear">
              Settings
            </DialogTitle>
            <DialogDescription className="mb-6">
              Make changes to your team here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <EditForm team={team} />
          </div>
          <DrawerFooter className="px-0 pt-12">
            <DrawerClose asChild>
              <Button
                disabled={loading}
                variant="outline"
                className="px-0 text-red-500 hover:text-red-500"
                onClick={handleDeleteTeam}
              >
                Delete team
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={"ghost"} className="ml-2">
          <Settings className="h-5 w-5 text-gray-500" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-xl font-semibold text-zinc-700 transition-all duration-100 ease-linear">
            Settings
          </DrawerTitle>
          <DrawerDescription className="mb-6">
            Make changes to your team here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <EditForm team={team} />
        </div>

        <DrawerFooter className="pt-12">
          <DrawerClose asChild>
            <Button
              disabled={loading}
              variant="outline"
              className="w-full text-red-500 hover:text-red-500"
              onClick={handleDeleteTeam}
            >
              Delete team
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function EditForm({ team }: { team: ITeam }) {
  const user = useQuery(api.v1.user.viewer);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: team.name,
    },
  });

  const updateTeamMutation = useMutation(api.v1.teams.updateTeam);

  const handleUpdateTeam = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      const result = await updateTeamMutation({
        teamId: team._id,
        name: data.name,
      });
      if (result === "updated") {
        setLoading(false);
        toast({
          title: "Team updated",
          description: "Your team has been updated successfully.",
        });
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Team was not updated.",
        });
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Team update failed.",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid items-start gap-4"
        onSubmit={form.handleSubmit(handleUpdateTeam)}
      >
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    // placeholder={name}
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
        <Button
          disabled={loading}
          type="submit"
          className="mt-9 bg-blue-500 hover:bg-blue-600"
        >
          {loading ? (
            <Loader className="animate-spin text-zinc-100 duration-700" />
          ) : (
            "Save changes"
          )}
        </Button>
      </form>
    </Form>
  );
}
