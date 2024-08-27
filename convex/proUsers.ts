// THIS IS NOT THE ACTUAL USER MODEL
// THIS IS USED FOR ACCESSING PARTS OF THE
// ORIGINAL USER MODEL/TABLE CREATED BY THE AUTH PROVIDER
import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

// Upgrade user by adding userId to pro table
export const upgradeUserToPro = mutation({
  args: {
    userId: v.id("users"),
    email: v.string(),
  },
  handler: async (ctx, { userId, email }) => {
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
