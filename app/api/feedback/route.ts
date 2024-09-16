import { NextResponse, type NextRequest } from "next/server";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchMutation, fetchQuery } from "convex/nextjs";

import { PAUSED, PENDING } from "@/lib/constants";

const Response = NextResponse;

export async function GET(request: NextRequest) {
  return Response.json({
    status: "success",
    message: "Working",
  });
}

export async function POST(request: NextRequest) {
  // const user = await fetchQuery(api.v1.user.viewer);
  // NB: For some weird reason, user appears to be null,
  // so i cannot retreive the id and the email.
  // A workaround is to have the client send it from its side,
  // making things easier over here: TODO: fix this weird error?

  const data = await request.json();
  const {
    userId,
    userEmail,
    orbitId,
    by,
    content,
    location,
    country_code,
    type,
    route,
    image,
    image_storage_id,
  } = data;

  const proUser = await fetchQuery(api.v1.proUsers.checkIfUserIsPro, {
    userId: userId as Id<"users">,
    email: userEmail as string,
  });

  // check if orbit exists before creating feedback
  const orbit = await fetchQuery(api.v1.orbits.fetchSingleOrbitNoAuth, {
    id: orbitId,
  });

  if (orbit == null) {
    return Response.json({
      status: "error",
      message: "Orbit does not exist",
    });
  }

  // now we check if they have exceeded their limit
  const res = await fetchQuery(api.v1.feedback.fetchFeedbackForOrbitNoAuth, {
    orbitId,
  });

  // if (res.length >= 4) {
  if (proUser == null && res.length >= 4) {
    return Response.json({
      status: "limit_reached",
      message: "You have exceeded your feedback limit",
    });
  }

  if (orbit.status === PAUSED) {
    return Response.json({
      status: "paused",
      message:
        "Creator has paused orbit. No feedback would be registered with orbit",
    });
  }

  const result = await fetchMutation(
    api.v1.feedback.createFeedbackForOrbitNoAuth,
    {
      orbitId: orbitId,
      by: by as string,
      content: content as string,
      location: location as string,
      country_code: country_code as string,
      type: type as string,
      route: route as string,
      image: image as string,
      image_storage_id: image_storage_id as Id<"_storage">,
      status: PENDING,
    }
  );

  if (result !== null) {
    return Response.json({
      status: "success",
      message: "Feedback created successfully",
      feedbackId: result,
    });
  } else {
    return Response.json({
      status: "error",
      message: "Feedback could not be created",
      feedbackId: null,
    });
  }
}
