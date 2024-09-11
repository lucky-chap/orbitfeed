// import { getAuthUserId } from "@convex-dev/auth/server";
import { GenericQueryCtx } from "convex/server";

import { DataModel, Id } from "./_generated/dataModel";
import { auth } from "./auth";

export async function checkUserId(ctx: GenericQueryCtx<DataModel>) {
  //   const userId = await getAuthUserId(ctx);
  const userId = await auth.getUserId(ctx);
  if (userId === null) {
    throw new Error("Client is not authenticated!");
  } else {
    return userId;
  }
}

export async function activityCreator(
  ctx: GenericQueryCtx<DataModel>,
  orbitId: Id<"orbits">,
  teamId: Id<"teams">,
  actorId: Id<"users">,
  action: string
) {
  // 1. get the logged in user
  const loggedInUserId = await checkUserId(ctx);
  // 2.
}
