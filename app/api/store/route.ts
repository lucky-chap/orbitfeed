import { NextResponse, type NextRequest } from "next/server";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchMutation, fetchQuery } from "convex/nextjs";

// update feedback image
export async function POST(request: NextRequest) {
  const data = await request.json();
  const { feedbackId, image } = data;
  const result = await fetchMutation(api.app.feedback.updateFeedbackImage, {
    feedbackId: feedbackId as Id<"feedback">,
    image: image as string,
  });
  if (result !== null) {
    return Response.json({
      status: "success",
      message: "Feedback image updated successfully",
    });
  } else {
    return Response.json({
      status: "update_failed",
      message: "Feedback image could not be updated",
    });
  }
}
