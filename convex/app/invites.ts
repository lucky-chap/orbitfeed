import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

import { mutation, query } from "../_generated/server";
import { checkUserId } from "../helpers";

export const getInvite = query({
  args: {
    recipientEmail: v.string(),
    senderEmail: v.any(),
  },
  handler: async (ctx, args) => {
    const invite = await ctx.db
      .query("invites")
      .withIndex("recipient", (q) =>
        q.eq("recipientEmail", args.recipientEmail)
      )
      .filter((q) => q.eq(q.field("senderEmail"), args.senderEmail))
      .order("desc")
      .first();

    return invite;
  },
});

export const createInvite = mutation({
  args: {
    recipientEmail: v.string(),
    senderEmail: v.string(),
    teamId: v.id("teams"),
  },
  handler: async (ctx, args) => {
    await checkUserId(ctx);
    const inviteId = await ctx.db.insert("invites", {
      recipientEmail: args.recipientEmail,
      senderEmail: args.senderEmail,
      teamId: args.teamId,
    });

    return inviteId;
  },
});
