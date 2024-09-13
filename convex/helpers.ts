// import { getAuthUserId } from "@convex-dev/auth/server";
import { GenericQueryCtx } from "convex/server";

import { internal } from "./_generated/api";
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
