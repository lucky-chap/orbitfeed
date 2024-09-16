import { NextResponse, type NextRequest } from "next/server";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchMutation, fetchQuery } from "convex/nextjs";

const Response = NextResponse;

export async function GET(request: NextRequest) {
  const url = await fetchMutation(api.v1.files.generateUploadUrl, {});
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

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { feedbackId, storageId } = data;

  const uploadId = await fetchMutation(api.v1.files.saveStorageId, {
    feedbackId: feedbackId as Id<"feedback">,
    storageId,
  });

  // nothing is returned when field is updated in convex so
  // just return a success message

  return Response.json({
    status: "success",
    upload_id: uploadId,
  });

  if (uploadId !== null) {
    return Response.json({
      status: "success",
      upload_id: uploadId,
    });
  }
  return Response.json({
    status: "fail",
    upload_id: uploadId,
  });
}
