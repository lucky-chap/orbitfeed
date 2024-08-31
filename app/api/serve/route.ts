import { NextResponse, type NextRequest } from "next/server";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchMutation, fetchQuery } from "convex/nextjs";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { feedbackId } = data;

  const url = await fetchMutation(api.app.files.serveFile, {
    feedbackId: feedbackId as Id<"feedback">,
  });

  if (url !== null) {
    return Response.json({
      status: "success",
      url: url,
    });
  }
  return Response.json({
    status: "fail",
    url: url,
  });
}
