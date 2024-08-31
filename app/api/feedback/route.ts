import { NextResponse, type NextRequest } from "next/server";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchMutation, fetchQuery } from "convex/nextjs";

// Hack for TypeScript before 5.2
const Response = NextResponse;

export async function GET(request: NextRequest) {
  return Response.json({
    status: "success",
    message: "Working",
  });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const {
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

  // check if orbit exists before creating feedback
  const orbit = await fetchQuery(api.app.orbits.fetchSingleOrbitNoAuth, {
    id: orbitId,
  });

  if (orbit == null) {
    return Response.json({
      status: "error",
      message: "Orbit does not exist",
    });
  }

  // now we check if they have exceeded their limit
  const res = await fetchQuery(api.app.feedback.fetchFeedbackForOrbitNoAuth, {
    orbitId,
  });

  if (res.feedback && res.length == 10) {
    return Response.json({
      // status must be success here so the user doesn't get frustrated that
      // their feedback was not created. It is up to the creator to decide if
      // they want to upgrade to a pro plan or not.
      status: "limit_reached",
      message: "You have exceeded your feedback limit",
    });
  }

  if (orbit.status === "Paused") {
    return Response.json({
      // status must be success here so the user doesn't get frustrated that
      // their feedback was not created. It is up to the creator to decide if
      // they want to upgrade to a pro plan or not.
      status: "paused",
      message:
        "Creator has paused orbit. No feedback would be registered with orbit",
    });
  }

  const result = await fetchMutation(
    api.app.feedback.createFeedbackForOrbitNoAuth,
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
