// THIS IS NOT THE ACTUAL USER MODEL
// THIS IS USED FOR ACCESSING PARTS OF THE
// ORIGINAL USER MODEL/TABLE CREATED BY THE AUTH PROVIDER
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { checkUserId } from "./helpers";

// check if user is a pro user
// @TODO: CHANGE THIS TO USE .FIRST() AND CHECK FOR UNDEFINED ON CLIENT
// export const checkIfUserIsPro = query({
//   args: {
//     paginationOpts: paginationOptsValidator,
//     userId: v.id("users"),
//     email: v.string(),
//   },
//   handler: async (ctx, { userId, email, paginationOpts }) => {
//     const user = await auth.getUserId(ctx);
//     if (user === null) {
//       throw new Error("Client is not authenticated!");
//     }
//     const proUsers = await ctx.db
//       .query("proUsers")
//       .filter((q) => q.eq(q.field("userId"), userId))
//       .filter((q) => q.eq(q.field("email"), email))
//       .paginate(paginationOpts);

//     return proUsers;
//   },
// });
export const checkIfUserIsPro = query({
  args: {
    userId: v.id("users"),
    email: v.string(),
  },
  handler: async (ctx, { userId, email }) => {
    await checkUserId(ctx);
    const proUser = await ctx.db
      .query("proUsers")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("email"), email))
      .first();

    return proUser;
  },
});

// Upgrade user by adding userId to pro table
export const upgradeUserToPro = mutation({
  args: {
    userId: v.id("users"),
    email: v.string(),
  },
  handler: async (ctx, { userId, email }) => {
    await checkUserId(ctx);

    const proUserId = await ctx.db.insert("proUsers", {
      userId,
      email,
    });

    if (proUserId !== null) {
      return {
        success: true,
        message: "User has been upgraded to Pro",
        proUserId,
      };
    } else {
      return {
        success: false,
        message: "User could not be upgraded to Pro",
        proUserId,
      };
    }
  },
});
