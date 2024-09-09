"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import {
  Camera,
  Image,
  Link,
  LoaderCircle,
  Settings,
  UserIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
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
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { toast } from "./ui/use-toast";

const FormSchema = z.object({
  name: z.string().min(4, {
    message: "Please enter a name with at least 4 characters",
  }),
  website: z.string().url({
    message: "Please enter a valid website",
  }),
  status: z.string({
    message: "Please choose a status",
  }),
  team_id: z.optional(z.string()),
});

export function SettingsMenu({
  orbitId,
  name,
  website,
  status,
  teamId,
}: {
  orbitId: any;
  name: string;
  website: string;
  status: string;
  teamId?: string | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const deleteOrbitMutation = useMutation(api.app.orbits.deleteOrbit);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const router = useRouter();

  const handleDeleteOrbit = async () => {
    if (orbitId) {
      setDeleting(true);
      const result = await deleteOrbitMutation({
        orbitId: orbitId as Id<"orbits">,
      });
      if (result === "deleted") {
        setDeleting(false);
        router.push("/orbits");
        toast({
          title: "Deleted!",
          description: "Orbit has been deleted",
        });
      } else {
        setDeleting(false);
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Orbit could not be deleted",
        });
      }
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button type="submit" className="px-2" variant={"outline"}>
            <Settings size={19} className="text-zinc-600" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-zinc-700 transition-all duration-100 ease-linear">
              Settings
            </DialogTitle>
            <DialogDescription className="mb-6">
              Make changes to your orbit here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <ProfileForm
              orbitId={orbitId}
              name={name}
              website={website}
              status={status}
              teamId={teamId}
            />
          </div>
          <DrawerFooter className="px-0 pt-12">
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="px-0"
                onClick={handleDeleteOrbit}
              >
                Delete orbit
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
        <Button type="submit" className="px-2" variant={"outline"}>
          <Settings size={19} className="text-zinc-600" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-xl font-semibold text-zinc-700 transition-all duration-100 ease-linear">
            Settings
          </DrawerTitle>
          <DrawerDescription className="mb-6">
            Make changes to your orbit here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <ProfileForm
            orbitId={orbitId}
            name={name}
            website={website}
            status={status}
            teamId={teamId}
          />
        </div>

        <DrawerFooter className="pt-12">
          <DrawerClose asChild>
            <Button variant="outline">Delete orbit</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// function ProfileForm({ className,  }: React.ComponentProps<"form">) {
function ProfileForm({
  orbitId,
  name,
  website,
  status,
  teamId,
}: {
  orbitId: any;
  name: string;
  website: string;
  status: string;
  teamId?: string | undefined;
}) {
  const updateOrbit = useMutation(api.app.orbits.updateOrbit);
  const [loading, setLoading] = useState(false);

  const user = useQuery(api.user.viewer);
  const proUser = useQuery(api.proUsers.checkIfUserIsPro, {
    userId: user?._id as Id<"users">,
    email: user?.email as string,
  });
  const allTeams = useQuery(api.app.teams.fetchTeams, {
    userId: user?._id as Id<"users">,
    user_email: user?.email as string,
  });

  const previousTeam = allTeams?.find((team) => team._id === teamId);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: name,
      website: website,
      status: status,
      team_id: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Data: ", data);
    console.log("Current status: ", data.status);
    console.log("Previous team from server: ", previousTeam);

    setLoading(true);
    try {
      const result = await updateOrbit({
        orbitId: orbitId,
        name: data.name,
        website: data.website,
        status: data.status,
        teamId: data.team_id as Id<"teams">, // i think leaving off this value may unset it in the db, check docs
      });
      if (result === "updated") {
        // move to team
        if (data.team_id !== undefined) {
          // check if the current selected team is the same
          // as the team from the props
          if (data.team_id == teamId) {
            setLoading(false);
            toast({
              variant: "default",
              title: "Orbit updated.",
              description: "Your orbit was updated successfully",
            });
            return;
          } else {
            // move to team
            const result = await updateOrbit({
              orbitId: orbitId,
              name: data.name,
              website: data.website,
              status: data.status,
              teamId: data.team_id as Id<"teams">,
            });
            if (result === "updated") {
              setLoading(false);
              toast({
                variant: "default",
                title: "Orbit updated.",
                description: "Orbit was moved to team successfully",
              });
            } else {
              setLoading(false);
              toast({
                variant: "destructive",
                title: "An error occurred",
                description: "Orbit was not moved to team.",
              });
            }
          }
        } else {
          setLoading(false);
          toast({
            variant: "default",
            title: "Orbit updated.",
            description: "Your orbit was updated successfully",
          });
        }
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Your orbit was not updated.",
        });
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Orbit update failed.",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn("grid items-start gap-4")}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid gap-2">
          {/* <Input type="email" id="email" defaultValue="shadcn@example.com" /> */}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={name}
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
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    placeholder={website}
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
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="" defaultValue={status}>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {proUser !== undefined && proUser !== null && (
          <div className="grid gap-2">
            {/* <div className="flex flex-col items-start">
              <h3 className="mb-2 font-medium">Team</h3>
              <Select defaultValue={previousTeam?.name}>
                <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent defaultValue={previousTeam?.name}>
                  <SelectGroup>
                    {allTeams?.map((team) => (
                      <SelectItem key={team._id} value={team._id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}
            <FormField
              control={form.control}
              name="team_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add to team</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Add to team" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allTeams?.map((team) => (
                        <SelectItem
                          key={team._id}
                          value={team._id} // the id is now the value since that is most important now
                        >
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <Button type="submit" className="mt-9 bg-blue-500 hover:bg-blue-600">
          {loading ? (
            <LoaderCircle className="animate-spin duration-700" />
          ) : (
            "Save changes"
          )}
        </Button>
      </form>
    </Form>
  );
}
