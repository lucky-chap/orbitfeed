"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Avatar02 from "@/public/images/avatar-02.webp";
import { RocketIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "convex/react";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Download, Loader, WandSparkles } from "lucide-react";

import { IFeedback, IMember, IParticipant, ITeam, IUser } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { DialogDescription } from "./ui/dialog";
import { toast } from "./ui/use-toast";

export default function AnalysisSheet({
  orbitId,
  feedback,
}: {
  orbitId: Id<"orbits"> | null | undefined;
  feedback: IFeedback[] | null | undefined;
}) {
  const user = useQuery(api.v1.user.viewer);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const orbit = useQuery(api.v1.orbits.fetchSingleOrbit, {
    id: orbitId as Id<"orbits">,
  });

  const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
  const currentTime = Date.now();
  const nextAllowedTime = (orbit?.lastAnalysed ?? 0) + ONE_WEEK_IN_MS;

  const createAnalysisMutation = useMutation(api.v1.orbits.createAnalysisDate);
  const createActivityMutation = useMutation(api.v1.activities.createActivity);

  const pickRandomFeedback = (results: IFeedback[] | null | undefined) => {
    // Pick only about 20 random feedback contents

    return results?.slice(0, 20).map((item) => item.content);
  };

  const handleGenerate = async () => {
    setContent("");
    setLoading(true);
    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ feedback: pickRandomFeedback(feedback) }),
    });
    if (res.ok) {
      const data = await res.json();
      setContent(data.text);
      const result = await createAnalysisMutation({
        orbitId: orbitId as Id<"orbits">,
        date: Date.now(),
      });
      if (result !== null) {
        const res = await createActivityMutation({
          orbitId: orbitId as Id<"orbits">,
          actorId: user?._id as Id<"users">,
          actorName: user?.name as string,
          actorImage: user?.image as string,
          action: `generated analysis for this orbit`,
        });
      }
      setLoading(false);
    } else {
      console.log("Failed attempt: ", res);
      toast({
        variant: "destructive",
        title: "Failed",
        content: res.statusText,
      });
    }
  };

  const downloadPdf = () => {
    const content = contentRef.current;

    if (content) {
      html2canvas(content, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        // Set image width and height to fit in A4 size paper
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Save PDF
        pdf.save("feedback-summary.pdf");
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          disabled={
            currentTime < nextAllowedTime || (feedback?.length ?? 0) < 10
          }
          onClick={handleGenerate}
          className="bg-blue-500 text-white shadow-xl shadow-blue-200 hover:bg-blue-600"
        >
          <WandSparkles className="mr-2" size={17} /> Generate analysis
        </Button>
      </SheetTrigger>
      <SheetContent id="sheet">
        <SheetHeader>
          <SheetTitle>Analysis</SheetTitle>
        </SheetHeader>
        <DialogDescription className="sr-only">
          Feedback analysis generated
        </DialogDescription>
        <Alert className="my-4">
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Make sure to download the analysis as a PDF before closing the
            sheet.
          </AlertDescription>
        </Alert>
        {loading && (
          <div className="flex h-full items-center justify-center">
            <Loader className="mr-1 h-7 w-7 animate-spin text-zinc-500" />
          </div>
        )}
        <div
          ref={contentRef}
          className="pb-5"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {!loading && (
          <Button
            onClick={() => downloadPdf()}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Download size={15} className="mr-2" /> Download as PDF
          </Button>
        )}
        <SheetFooter className="mt-20">
          <SheetClose asChild>
            <Button variant={"ghost"}>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
