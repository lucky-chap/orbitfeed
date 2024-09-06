"use client";

import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import {
  Badge,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Code,
  Code2,
  Copy,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CodeDialog({ orbitId }: { orbitId: string }) {
  const user = useQuery(api.user.viewer);

  const [npmCopied, setNPMCopied] = useState(false);
  const [importCopied, setImportCopied] = useState(false);
  const [useCopied, setUseCopied] = useState(false);

  const handleNPMCopy = () => {
    if (orbitId) {
      navigator.clipboard.writeText("npm install OrbitFeedjs");
      setNPMCopied(true);
      setTimeout(() => {
        setNPMCopied(false);
      }, 1000);
    }
  };

  const handleImportCopy = () => {
    if (orbitId) {
      navigator.clipboard.writeText("import FeedbackWidget from 'OrbitFeedjs'");
      setImportCopied(true);
      setTimeout(() => {
        setImportCopied(false);
      }, 1000);
    }
  };

  const handleUseCopy = () => {
    if (orbitId) {
      navigator.clipboard.writeText(
        `<FeedbackWidget userId='${user?._id}' userEmail='${user?.email}' orbitId='${orbitId}' />`
      );
      setUseCopied(true);
      setTimeout(() => {
        setUseCopied(false);
      }, 1000);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-7 p-2 text-xs">
          <Code size={14} className="mr-1 text-zinc-600" />
          <span className="text-xs font-medium">Code</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="">
            Using OrbitFeed on your website
          </DialogTitle>
          <DialogDescription className="pt-3">
            You can use the OrbitFeed component in your project by following the
            steps below
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-end space-x-2">
          <div className="grid flex-1 gap-2">
            <div className="flex items-end justify-between">
              <Card className="w-full border-none shadow-none">
                <CardHeader className="p-0">
                  <h2 className="text-sm font-medium">Install OrbitFeed</h2>
                </CardHeader>
                <CardContent className="mt-3 flex w-full items-center rounded-md bg-zinc-100 p-0 font-medium">
                  <pre className="w-full rounded-md p-2 text-sm">
                    <code className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      <p className="font-medium text-green-600">npm</p> install
                      orbitfeed
                    </code>
                  </pre>
                </CardContent>
              </Card>
              <Button
                variant={"secondary"}
                size="sm"
                className="mb-1 ml-1 px-3"
                onClick={handleNPMCopy}
              >
                <span className="sr-only">Copy</span>
                {npmCopied ? (
                  <span className="sr-only">Copied</span>
                ) : (
                  <span className="sr-only">Copy</span>
                )}
                {npmCopied ? (
                  <ClipboardCheck className="ml-1 h-4 w-4" />
                ) : (
                  <Copy className="ml-1 h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex items-end justify-between">
              <Card className="mt-3 w-full border-none shadow-none">
                <CardHeader className="p-0">
                  <h2 className="text-sm font-medium">Import package</h2>
                </CardHeader>
                <CardContent className="mt-3 flex w-full items-center rounded-md bg-zinc-100 p-0 font-medium">
                  <pre className="w-full rounded-md p-2 text-sm">
                    <code className="flex items-center">
                      <p className="text-purple-600">import</p>{" "}
                      <span className="px-2 text-red-600">FeedbackWidget</span>
                      <p className="pr-2 text-purple-600">from</p>{" "}
                      <p className="text-green-600">"orbitfeed"</p>{" "}
                    </code>
                  </pre>
                </CardContent>
              </Card>
              <Button
                variant={"secondary"}
                size="sm"
                className="mb-1 ml-1 px-3"
                onClick={handleImportCopy}
              >
                <span className="sr-only">Copy</span>
                {importCopied ? (
                  <span className="sr-only">Copied</span>
                ) : (
                  <span className="sr-only">Copy</span>
                )}
                {importCopied ? (
                  <ClipboardCheck className="ml-1 h-4 w-4" />
                ) : (
                  <Copy className="ml-1 h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex items-end justify-between">
              <Card className="mt-3 w-full rounded-md border-none shadow-none">
                <CardHeader className="p-0">
                  <h2 className="text-sm font-medium">Use it like this</h2>
                </CardHeader>
                <CardContent className="mt-3 flex w-full items-center bg-zinc-100 p-0 font-medium">
                  <pre className="w-full rounded-md bg-zinc-100 p-2 text-sm text-zinc-300">
                    <code className="flex items-center">
                      <p className="text-purple-600">
                        <ChevronLeft className="-mr-1 h-4 w-4" />
                      </p>{" "}
                      <span className="-pl-3 pr-2 text-amber-600">
                        FeedbackWidget
                      </span>
                      <p className="text-blue-500">orbitId=</p>
                      <span className="rounded bg-zinc-200 px-2 py-[2px] text-zinc-400 md:hidden">
                        {orbitId?.substring(0, 2) + "..."}
                      </span>
                      <span className="hidden rounded bg-zinc-200 px-2 py-[2px] text-zinc-400 md:block">
                        {orbitId?.substring(0, 10) + "..."}
                      </span>
                      <span className="inline-flex pl-3 text-zinc-400">
                        ...
                      </span>
                      {/* <p className="ml-1 text-purple-300">/</p>{" "} */}
                      {/* <ChevronRight className="-ml-1 h-4 w-4" /> */}
                    </code>
                  </pre>
                </CardContent>
              </Card>
              <Button
                variant={"secondary"}
                size="sm"
                className="mb-1 ml-1 px-3"
                onClick={handleUseCopy}
              >
                <span className="sr-only">Copy</span>
                {useCopied ? (
                  <span className="sr-only">Copied</span>
                ) : (
                  <span className="sr-only">Copy</span>
                )}
                {useCopied ? (
                  <ClipboardCheck className="ml-1 h-4 w-4" />
                ) : (
                  <Copy className="ml-1 h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
        <p className="text-xs text-zinc-600">
          NB: It is recommended to store your{" "}
          <span className="font-medium text-zinc-900">orbitId</span> in an env
          file.
        </p>
        <DialogFooter className="flex justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="py-2">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
