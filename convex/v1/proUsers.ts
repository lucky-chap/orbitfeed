import { v } from "convex/values";

import { internal } from "../_generated/api";
import { Id } from "../_generated/dataModel";
import { internalMutation, mutation, query } from "../_generated/server";
import { checkUserId } from "../helpers";

export const checkIfUserIsPro = query({
  args: {
    userId: v.id("users"),
    email: v.string(),
  },
  handler: async (ctx, { userId, email }) => {
    const proUser = await ctx.db
      .query("proUsers")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("email"), email))
      .unique();

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

// Would have loved to send the email here instead of using an
// API route at /api/thank-you, but it seems Resend doesn't work here,
// can't use "use node" in this file because I need the other convex function here
// An option would be to make the RESEND_API key public, but that's not secure
